import Posting from '../../models/posting';
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var options = new chrome.Options();
	options.addArguments('headless', 'disable-gpu');

export default class nexonCrawler {
	constructor() {
		this.company = 'nexon';
		this.name = '넥슨';
		this.links = [];
		this.url = 'https://career.nexon.com/user/recruit/notice/noticeList?joinCorp=NX';
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
		let linkData = [];

		if(rawData.title === undefined || rawData.link === undefined) {
			console.log(this.company, 'refineData: rawData is not valid');
			return;
		}

		for(let e in rawData.link) {
			let defaultURL = 'https://career.nexon.com';
			linkData.push(defaultURL + rawData.link[e]);
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
				expire: '채용시'
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

		let dataCommand = "let title = $('div.content tbody tr td.tleft.fc_02 a span').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
			dataCommand += "let link = $('div.content tbody tr td.tleft.fc_02 a').map(function() {";
			dataCommand += "return $(this).attr('href');";
			dataCommand += "}).get();";
			dataCommand += "let jobGroup = $('div.content tbody tr td.company_color span').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
			dataCommand += "";
			dataCommand += "return {";
			dataCommand += "title: title,";
			dataCommand += "link: link,";
			dataCommand += "jobGroup: jobGroup";
			dataCommand += "};";

		let getPageCountCommand = "let next = $('div.content .page').children();";
			getPageCountCommand += "if(next[4].src === 'https://bimg.nexon.com/images/career_imgs/NEW/page_last.png')";
			getPageCountCommand += "return true;";
			getPageCountCommand += "else return false;";

		driver.get(url).catch((err) => {
			return;
		});
		driver.wait(until.titleContains('넥슨'), 5000).catch((err) => {
			return;
		});
		let that = this;

		(function pageIterator() {
			driver.executeScript(getPageCountCommand).then((isEnd) => {
				if(isEnd) {
					driver.executeScript(dataCommand).then((data) => {
						that.refineData(data);
					}).catch((err) => {
						return;
					});
				} else {
					driver.executeScript(dataCommand).then((data) => {
						that.refineData(data);
						driver.findElement(By.className('next')).click().then(() => {
							pageIterator();
						});
					}).catch((err) => {
						return;
					});
				}
			}).catch((err) => {
				return;
			});
		})();

		driver.quit();
	}
}
