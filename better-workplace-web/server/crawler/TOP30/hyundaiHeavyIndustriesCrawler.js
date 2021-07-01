import Posting from '../../models/posting';
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var options = new chrome.Options();
	options.addArguments('headless', 'disable-gpu');

export default class hyundaiHeavyIndustriesCrawler {
	constructor() {
		this.company = 'hyundaiHeavyIndustries';
		this.name = '현대중공업';
		this.links = [];
		this.url = 'https://recruit.hhi.co.kr/RECRUIT_HHI/hr/rec/recruit/jobopen/controller/candidate/JobOpen310WebController/init.hr';
		this.executeCrawling = this.executeCrawling.bind(this);
		this.refineData = this.refineData.bind(this);
		this.getPageLinks = this.getPageLinks.bind(this);
		this.removeExistingData = this.removeExistingData.bind(this);
		this.start = this.start.bind(this);
	}

	/**
	 * @name	: start
	 * @param	: none
	 * @summary : This function is the starting point for each crawler.
				  This function calls getPageLinks, and executeCrawling.
	//*/
	start() {
		this.getPageLinks().then(() => {
			this.removeExistingData();
			this.links.forEach((link) => {
				this.executeCrawling(link);
			});
		});
	}

	/**
	 * @name	: removeExistingData
	 * @param	: none
	 * @summary : This function is remove existing Posting data before crawling.
	//*/
	removeExistingData() {
		Posting.remove({company: this.company}, (err) => {
			if(err) throw err;
		});
	}

	/**
	 * @name	: getPageLinks
	 * @param	: none
	 * @summary : This function brings all bulletin URLS
				  when there are multiple recruitment notice bulletins.
	//*/
	getPageLinks() {
		return new Promise((resolve) => {
			this.links = [this.url];
			resolve();
		});
	}

	/**
	 * @name	: refineData
	 * @param	: rawData
	 * @summary : This function refines the raw data which is returned from executeCrawling function.
				  After refining, this function saves datas into mongodb.
	//*/
	refineData(rawData) {
		let titleData = [], expireData = [];

		if(rawData.title === undefined || rawData.period === undefined) {
			console.log(this.company, 'refineData: rawData is not valid');
			return;
		}

        if(rawData.title.length !== rawData.head.length) {
            console.log(this.company, 'refineData: rawData is not valid');
            return;
        }

        for(let e in rawData.title) {
            if(rawData.title[e].trim && rawData.head[e].trim) {
                titleData.push(rawData.title[e].trim() + ' - ' + rawData.head[e].trim());
            }
        }

		for(let e in rawData.period) {
            let part = rawData.period[e];
            if(part.split && part.split('~')[1] && part.split('~')[1].trim && part.split('~')[1].trim().split) {
                expireData.push(part.split('~')[1].trim().split(' ')[0]);
            }
		}

		if(titleData.length !== expireData.length) {
			console.log(this.company, 'refineData: rawData is not valid');
			return;
		}

		for(let i in rawData.title) {
			new Posting({
				company: this.company,
				name: this.name,
				title: titleData[i],
				link: this.url,
				jobGroup: 'UNDEFINED',
				expire: expireData[i]
			}).save((err) => {
				if(err) throw err;
			});
		}
	}

	/**
	 * @name	: executeCrawling
	 * @param	: url(string)
	 * @summary : This function runs crawling with given URL.
				  Inject jQuery into target page, and extract title, job group, url of recruitment notice.
	//*/
	executeCrawling(url) {
		var driver = new webdriver.Builder()
		    			.withCapabilities(webdriver.Capabilities.chrome())
						.setChromeOptions(options)
		    			.build();

		let dataCommand = "let title = $('#list_jobopen_data dl dd').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
            dataCommand += "let head = $('#list_jobopen_data dt').map(function() {";
            dataCommand += "return $(this).text();";
            dataCommand += "}).get();"
            dataCommand += "let period = $('#list_jobopen_data .date').map(function() {";
			dataCommand += "return $(this)[0].innerText;";
			dataCommand += "}).get();";
			dataCommand += "";
			dataCommand += "return {";
			dataCommand += "title: title,";
            dataCommand += "head: head,";
			dataCommand += "period: period";
			dataCommand += "};";

		driver.get(url).catch((err) => {
			return;
		});
		driver.wait(until.titleContains('현대중공업'), 5000).catch((err) => {
			return;
		});
		let that = this;
		driver.executeScript(dataCommand).then(function(data) {
			that.refineData(data);
		}).catch((err) => {
			return;
		});

		driver.quit();
	}
}
