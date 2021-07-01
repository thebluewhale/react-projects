import Posting from '../../models/posting';
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var options = new chrome.Options();
	options.addArguments('headless', 'disable-gpu');

export default class daelimCrawler {
	constructor() {
		this.company = 'daelim';
		this.name = '대림';
		this.links = [];
		this.url = 'https://daelim.recruiter.co.kr/app/jobnotice/list#';
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
		let expireData = [], linkData = [];

		if(rawData.title === undefined || rawData.period === undefined) {
			console.log(this.company, 'refineData: rawData is not valid');
			return;
		}

		for(let e in rawData.period) {
            let part = rawData.period[e];
            if(part.split && part.split('~')[1] && part.split('~')[1].split) {
                expireData.push(part.split('~')[1].split('(')[0].trim());
            }
		}

		if(rawData.title.length !== expireData.length) {
			console.log(this.company, 'refineData: rawData is not valid');
			return;
		}

        for(let e in rawData.link) {
            let defaultURL = 'https://daelim.recruiter.co.kr/app/jobnotice/view?systemKindCode=MRS1&jobnoticeSn=';
            linkData.push(defaultURL + rawData.link[e]);
        }

		for(let i in rawData.title) {
            console.log(rawData.title[i]);
            console.log(linkData[i]);
            console.log(expireData[i]);
            console.log('');
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

        let dataCommand = "let title = $('#divJobnoticeList .list-bbs-title a').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
            dataCommand += "let period = $('#divJobnoticeList .list-bbs-date').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
            dataCommand += "let link = $('#divJobnoticeList .list-bbs-title a').map(function() {";
            dataCommand += "return $(this)[0].dataset.jobnoticesn;";
            dataCommand += "}).get();";
			dataCommand += "";
			dataCommand += "return {";
			dataCommand += "title: title,";
			dataCommand += "period: period,";
            dataCommand += "link: link";
			dataCommand += "};";

		driver.get(url).catch((err) => {
			return;
		});
		driver.wait(until.titleContains('대림'), 5000).catch((err) => {
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
