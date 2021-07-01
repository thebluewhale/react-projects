import Posting from '../../models/posting';
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var options = new chrome.Options();
	options.addArguments('headless', 'disable-gpu');

export default class lotteCrawler {
	constructor() {
		this.company = 'lotte';
		this.name = '롯데';
		let links = [];
		this.url = 'http://job.lotte.co.kr/LotteRecruit/Recruit_Info/RecruitList.aspx?regtype=&nowpage=1&keyword=&keyselect=99999';
		this.executeCrawling = this.executeCrawling.bind(this);
		this.refineData = this.refineData.bind(this);
		this.combineURL = this.combineURL.bind(this);
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
	 * @name	:
	 * @param	:
	 * @summary :
	//*/
	combineURL(emptype, keyselect, nowpage) {
		let defaultURL = 'http://job.lotte.co.kr/LotteRecruit/Recruit_Info/RecruitView.aspx?';
			defaultURL += 'emptype=' + emptype;
			defaultURL += '&nowpage=' + nowpage;
			defaultURL += '&keyselect=' + keyselect;

		return defaultURL;
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
			let parts = rawData.link[e].split(',');
			let newURL = this.combineURL(parts[1].split('"')[1], parts[3].split('"')[1], parts[4].split('"')[1]);
			linkData.push(newURL);
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

		let dataCommand = "let title = $('#content tbody tr td.subject a').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
			dataCommand += "let link = $('#content tbody tr td.subject a').map(function() {";
			dataCommand += "return $(this).attr('onclick');";
			dataCommand += "}).get();";
			dataCommand += "let period = $('#content tbody tr td.fs02').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
			dataCommand += "";
			dataCommand += "return {";
			dataCommand += "title: title,";
			dataCommand += "link: link,";
			dataCommand += "period: period";
			dataCommand += "};";

		let getPageCountCommand = "let lastPage = $('.pagging #last a').attr('href');";
			getPageCountCommand += "lastPage = lastPage.split('nowpage=')[1][0];";
			getPageCountCommand += "let currentPage = $('#content .pagging #selectedPage a.on').text();";
			getPageCountCommand += "if(lastPage === currentPage) return true;";
			getPageCountCommand += "else return false;";

		let nextButtonClick = "$('#btnNextPage a img').click();";

		driver.get(url).catch((err) => {
			return err;
		});
		driver.wait(until.titleContains('롯데'), 5000).catch((err) => {
			return err;
		});
		let that = this;

		(function pageIterator() {
			driver.executeScript(getPageCountCommand).then((isEnd) => {
				if(isEnd) {
					driver.executeScript(dataCommand).then((data) => {
						that.refineData(data);
					}).catch((err) => {
						return err;
					});
				} else {
					driver.executeScript(dataCommand).then((data) => {
						that.refineData(data);
						driver.executeScript(nextButtonClick).then(() => {
							pageIterator();
						}).catch((err) => {
							return err;
						});
					}).catch((err) => {
						return err;
					});
				}
			}).catch((err) => {
				return err;
			});
		})();

		driver.quit();
	}
}
