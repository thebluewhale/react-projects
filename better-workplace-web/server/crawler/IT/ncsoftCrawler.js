import Posting from '../../models/posting';
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var options = new chrome.Options();
	options.addArguments('headless', 'disable-gpu');

export default class ncsoftCrawler {
	constructor() {
		this.company = 'ncsoft';
		this.name = '엔씨소프트';
		this.links = [];
		this.url = 'https://recruit.ncsoft.net/korean/careers/adoptionsection.aspx';
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
				if(link === '#none') {
					this.executeCrawling(this.url);
				} else {
					this.executeCrawling('https://recruit.ncsoft.net/korean/careers/' + link);
				}
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
			var driver = new webdriver.Builder()
			    			.withCapabilities(webdriver.Capabilities.chrome())
                            .setChromeOptions(options)
			    			.build();

			driver.get(this.url).catch((err) => {
				return;
			});
			driver.wait(until.titleContains('입사지원'), 5000).catch((err) => {
				return;
			});

			let that = this;
			let getDataCommand = "return $('.direct-num a').map(function() { return $(this).attr('href');}).get();";
			driver.executeScript(getDataCommand).then(function(links) {
				that.links = links;
			}).catch((err) => {
				return;
			});
			driver.quit().then(() => {
				return resolve();
			});
		});
	}

	/**
	 * @name	: refineData
	 * @param	: rawData
	 * @summary : This function refines the raw data which is returned from executeCrawling function.
	 			  After refining, this function saves datas into mongodb.
	//*/
	refineData(rawData) {
		let linkData = [], expireData = [];

		if(rawData.title === undefined || rawData.link === undefined || rawData.period === undefined) {
			console.log(this.company, 'refineData: rawData is not valid');
			return;
		}

		for(let e in rawData.link) {
			let defaultURL = 'https://recruit.ncsoft.net/korean/careers/';
			linkData.push(defaultURL + rawData.link[e]);
		}

		for(let e in rawData.period) {
			let expire = '';
			if(rawData.period[e].includes('~')) {
				expire = rawData.period[e].split('~')[1].trim();
			} else {
				expire = rawData.period[e];
			}
			expireData.push(expire);
		}

		if(rawData.title.length !== linkData.length) {
			console.log(this.company, 'refineData: rawData is not valid');
			return;
		}

		for(let i in rawData.title) {
			new Posting({
				company: this.company,
				name: this.name,
				title: rawData.title[i],
				link: linkData[i],
				jobGroup: rawData.jobGroup[i],
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

		let dataCommand = "let title = $('#primaryContent table tbody tr td.title a').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
			dataCommand += "let link = $('#primaryContent table tbody tr td.title a').map(function() {";
			dataCommand += "return $(this).attr('href');";
			dataCommand += "}).get();";
			dataCommand += "let jobGroup = $('#primaryContent table tbody tr td:nth-child(1)').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
			dataCommand += "let period = $('#primaryContent table tbody tr td:nth-child(3)').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
			dataCommand += "";
			dataCommand += "return {";
			dataCommand += "title: title,";
			dataCommand += "link: link,";
			dataCommand += "jobGroup: jobGroup,";
			dataCommand += "period: period";
			dataCommand += "};";

		driver.get(url).catch((err) => {
			return;
		});
		driver.wait(until.titleContains('입사지원'), 5000).catch((err) => {
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
