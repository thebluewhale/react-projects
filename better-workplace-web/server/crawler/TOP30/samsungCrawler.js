import Posting from '../../models/posting';
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var options = new chrome.Options();
	options.addArguments('headless', 'disable-gpu');

export default class samsungCrawler {
	constructor() {
		this.company = 'samsung';
		this.name = '삼성';
		this.links = [];
		this.url = 'http://www.samsungcareers.com/rec/apply/ComResumeServlet?cmd=pstMain';
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
		let linkData = [], expireData = [];

		if(rawData.title === undefined || rawData.link === undefined || rawData.period === undefined) {
			console.log(this.company, 'refineData: rawData is not valid');
			return;
		}

		for(let e in rawData.link) {
			let defaultURL = 'http://apply.samsung.co.kr/rec/apply/ComResumeServlet?cmd=pstContent&recseq=';
			let link = rawData.link[e];
			link = link.replace(/javascript:popnotice\('/g,'').replace(/'\)/g,'');
			linkData.push(defaultURL + link);
		}

		if(linkData.length !== rawData.title.length) {
			console.log(this.company, 'refineData: rawData is not valid');
			return;
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

		for(let i in rawData.title) {
			new Posting({
				company: this.company,
				name: this.name,
				title: rawData.title[i],
				link: linkData[i],
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

		let dataCommand = "let title = $('.table_list').map(function() {";
			dataCommand += "let compcd = $(this).find('.compcd').text();";
			dataCommand += "let majcd = $(this).find('a').text();";
			dataCommand += "return compcd + ' : ' + majcd;";
			dataCommand += "}).get();";
			dataCommand += "let link = $('.table_list').map(function() {";
			dataCommand += "return $(this).find('a').attr('href');";
			dataCommand += "}).get();";
			dataCommand += "let period = $('.table_list td:nth-child(5)').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
			dataCommand += "";
			dataCommand += "return {";
			dataCommand += "title: title,";
			dataCommand += "link: link,";
			dataCommand += "period: period";
			dataCommand += "};";

		driver.get(url).catch((err) => {
			return;
		});
		driver.wait(until.titleContains('삼성'), 5000).catch((err) => {
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
