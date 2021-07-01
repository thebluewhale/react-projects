import ChannelDB from './channelDB';
import Channel from '../models/channel';
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var options = new chrome.Options();
	options.addArguments('headless', 'disable-gpu');

export default class channelCrawler {
	constructor() {
        this.defaultURL = 'http://211.43.210.44/tvguide/index.php?';
        this.makeDB = this.makeDB.bind(this);
	}

    /**
     * @name	: makeDB
     * @param	: main, category (String, String)
     * @summary : This function can make DB easier.
                  Call this function, and this function makes DB.
    //*/
    makeDB(main, category) {
        var driver = new webdriver.Builder()
		    			.withCapabilities(webdriver.Capabilities.chrome())
						.setChromeOptions(options)
		    			.build();

        let refinedURL = '';
        if (main === 'public') {
            refinedURL = 'http://211.43.210.44/tvguide/index.php?main=public';
        } else if (main === 'cable') {
            refinedURL = 'http://211.43.210.44/tvguide/index.php?main=cable&sub=cable0';
        } else if (main === 'skylife') {
            refinedURL = 'http://211.43.210.44/tvguide/index.php?main=skylife&sub=sky0';
        } else {
            console.log('organization channel should be collected manually');
        }

        let query =  'let channel_list = document.querySelectorAll("#pop table tbody tr td a");';
            query += 'let companyName = []; let companyNumber = [];';
            query += 'Object.keys(channel_list).map(function(key, index) {';
            query += '    companyName.push(channel_list[index].textContent);';
            query += '    companyNumber.push(channel_list)[index].href.split("&c=")[1]);';
            query += '});'
            query += 'return {';
            query += '    companyName: companyName,';
            query += '    companyNumber: companyNumber';
            query += '};';

		driver.get(refinedURL).catch((err) => {
            console.log(err);
			return;
		});
		driver.wait(until.titleContains('편성표'), 5000).catch((err) => {
            console.log(err);
			return;
		});
		let _this = this;
		driver.executeScript(query).then(function(data) {
            let length = data.companyName.length;
            let obj = {};
            for (let i = 0; i < length; i++) {
                obj[data.companyName[i]] = {};
                obj[data.companyName[i]]['main'] = main;
                obj[data.companyName[i]]['number'] = data.companyNumber[i];
                obj[data.companyName[i]]['category'] = category;
            }
            console.log(obj);
		}).catch((err) => {
            console.log(err);
			return;
		});

		driver.quit();
    }
}
