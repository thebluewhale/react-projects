import ChannelDB from './channelDB';
import Channel from '../models/channel';
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var options = new chrome.Options();
	options.addArguments('headless', 'disable-gpu');

export default class timetableCrawler {
	constructor() {
        this.defaultURL = 'http://211.43.210.44/tvguide/index.php?';
        this.channelURL = '';
        this.provider = '';
        this.main = '';
        this.number = '';
        this.totalDBLength = 0;
        this.currentIndex = 0;
        this.start = this.start.bind(this);
        this.refineAndSaveData = this.refineAndSaveData.bind(this);
	}

	/**
	 * @name	: start
	 * @param	: none
	 * @summary : This function is the starting point for each crawler.
				  This function calls getPageLinks, and executeCrawling.
	//*/
	start(provider, main, number, totalDBLength, currentIndex) {
        this.provider = provider;
        this.main = main;
        this.number = number;
        this.totalDBLength = totalDBLength;
        this.currentIndex = currentIndex;
        let urlQuery = 'main=' + this.main + '&c=' + this.number;
        this.channelURL = this.defaultURL + urlQuery;
		this.executeCrawling();
	}

    /**
     * @name	: refineAndSaveData
     * @param	: data(object)
     * @summary : This function refines and saves the data.
    //*/
    refineAndSaveData(data) {
        if (!(data.timeTable) || !(data.titleTable)) {
            console.log('refineAndSaveData : invalid raw data');
        }

        let prettyHour = new Date().getHours();
        let prettyMin = new Date().getMinutes();

        let r_timeTable = [];
        for (let e in data.timeTable) {
            if (data.timeTable[e] != ' ') {
                r_timeTable.push(data.timeTable[e]);
            }
        }

        let r_titleTable = [];
        for (let e in data.titleTable) {
            r_titleTable.push(data.titleTable[e]);
        }

        if (r_timeTable.length != r_titleTable.length) {
            console.log('refineAndSaveData : invalid refined data');
            return;
        }

        let dataRefreshed = false;
        let newTitle = '';
        for (let e in r_timeTable) {
            if (Number(prettyMin) >= Number(r_timeTable[e])) {
                dataRefreshed = true;
                newTitle = r_titleTable[e];
            }
        }

        if (dataRefreshed) {
            Channel.findOne({provider: this.provider}, (err, data) => {
                if (err) {
                    throw err;
                } else if (!data) {
                    console.log(`[${this.currentIndex}/${this.totalDBLength}] PROCESSING...`);
                    console.log(`refineAndSaveData : invalid DB (${this.provider})`);
                    // cannot find data
                } else {
                    console.log(`[${this.currentIndex}/${this.totalDBLength}] PROCESSING...`);
                    console.log(`refineAndSaveData : save DB(${this.provider}, ${newTitle})`);
                    data.onair = newTitle;
                    data.save((err, data) => {
                        if (err) throw err;
                    });
                }
            });
        }
    }

	/**
	 * @name	: executeCrawling
	 * @param	: url(string)
	 * @summary : This function runs crawling with given URL.
				  Inject jQuery into target page, and extract title, job group, url of recruitment notice.
	//*/
	executeCrawling() {
		var driver = new webdriver.Builder()
		    			.withCapabilities(webdriver.Capabilities.chrome())
						.setChromeOptions(options)
		    			.build();

        /* timetable start with 00, so crawler should get (pretty hour + 1)th data */
        let prettyHour = new Date().getHours() + 1;

        let query  = 'let timeCell = document.querySelectorAll("#result_tbl tbody tr:nth-child(' +
                        prettyHour + ') td:nth-child(3) table tbody tr td:nth-child(1)");';
            query += 'let titleCell = document.querySelectorAll("#result_tbl tbody tr:nth-child(' +
                        prettyHour +') td:nth-child(3) table tbody tr td:nth-child(2)");';
            query += 'let timeTable = []; let titleTable = [];';
            query += 'Object.keys(timeCell).map(function(key, index) {';
            query += '  timeTable.push(timeCell[index].textContent);';
            query += '});';
            query += 'Object.keys(titleCell).map(function(key, index) {';
            query += '  titleTable.push(titleCell[index].textContent);';
            query += '});';
            query += 'return {';
            query += '  timeTable: timeTable,';
            query += '  titleTable: titleTable';
            query += '};';

		driver.get(this.channelURL).catch((err) => {
			return;
		});
		driver.wait(until.titleContains('편성표'), 5000).catch((err) => {
			return;
		});
		let _this = this;
		driver.executeScript(query).then(function(data) {
            _this.refineAndSaveData(data);
		}).catch((err) => {
            console.log(err);
			return;
		});

		driver.quit();
	}
}
