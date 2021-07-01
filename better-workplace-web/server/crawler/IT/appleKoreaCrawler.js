import Posting from '../../models/posting';
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var options = new chrome.Options();
	options.addArguments('headless', 'disable-gpu');

export default class appleKoreaCrawler {
	constructor() {
		this.company = 'appleKorea';
		this.name = '애플코리아';
		let links = [];
		this.url = 'https://jobs.apple.com/kr/search?jobFunction=SFWEG#function&t=0&sb=req_open_dt&so=1&j=AIS|CSPSV|ADMCL|DES|RET|MKTPM|AOS|LEGAL|FACLT|SFWEG|MTLMF|HURES|CGINT|FINAN|MIS|PMN|SALES|HDWEG&lo=0*KOR&pN=0';
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
			this.links = [
				'https://jobs.apple.com/kr/search?jobFunction=SFWEG#function&t=0&sb=req_open_dt&so=1&j=AIS|CSPSV|ADMCL|DES|RET|MKTPM|AOS|LEGAL|FACLT|SFWEG|MTLMF|HURES|CGINT|FINAN|MIS|PMN|SALES|HDWEG&lo=0*KOR&pN=0',
				'https://jobs.apple.com/kr/search?jobFunction=SFWEG#function&t=0&sb=req_open_dt&so=1&j=AIS|CSPSV|ADMCL|DES|RET|MKTPM|AOS|LEGAL|FACLT|SFWEG|MTLMF|HURES|CGINT|FINAN|MIS|PMN|SALES|HDWEG&lo=0*KOR&pN=1'
			];
			return resolve();
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
			let jobID = rawData.link[e].split('jobs_list-')[1];
			let defaultURL = rawData.currentURL + '&openJobId=';
			linkData.push(defaultURL + jobID);
		}

		if(linkData.length !== rawData.title.length) {
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
				expire : 'UNDEFINED'
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

		let dataCommand = "var tempTitleArr = [];";
			dataCommand += "var tempLinkArr = [];";
            dataCommand += "var tempJobGroup = [];";
			dataCommand += "var title = document.querySelectorAll('#jobs_list .title p a');";
			dataCommand += "Object.keys(title).map(function(key, index) {";
			dataCommand += "tempTitleArr.push(title[index].innerHTML);";
			dataCommand += "});";
			dataCommand += "let link = document.querySelectorAll('#jobs_list .title p a');";
			dataCommand += "Object.keys(link).map(function(key, index) {";
			dataCommand += "tempLinkArr.push(link[index].id);";
			dataCommand += "});";
            dataCommand += "let jobGroup = document.querySelectorAll('#jobs_list tr.searchresult td:nth-child(2)');";
            dataCommand += "Object.keys(jobGroup).map(function(key, index) {";
            dataCommand += "tempJobGroup.push(jobGroup[index].title);";
            dataCommand += "});";
			dataCommand += "return {";
			dataCommand += "title: tempTitleArr,";
			dataCommand += "link: tempLinkArr,";
            dataCommand += "jobGroup: tempJobGroup,";
			dataCommand += "currentURL: document.URL";
			dataCommand += "};";

		driver.get(url).catch((err) => {
			return;
		});
		driver.wait(until.titleContains('Apple'), 5000).catch((err) => {
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
