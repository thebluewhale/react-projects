import Posting from '../../models/posting';
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var options = new chrome.Options();
	options.addArguments('headless', 'disable-gpu');

export default class wemakepriceCrawler {
	constructor() {
		this.company = 'wemakeprice';
		this.name = '위메프';
		this.links = [];
		this.url = 'https://recruit.wemakeprice.com/notice/list';
		this.executeCrawling = this.executeCrawling.bind(this);
		this.refineData = this.refineData.bind(this);
		this.combineURL = this.combineURL.bind(this);
		this.getPageLinks = this.getPageLinks.bind(this);
		this.removeExistingData = this.removeExistingData.bind(this);
		this.start = this.start.bind(this);
	}

	/**
	 * @name	: combineURL
	 * @param	:
	 * @summary :
	//*/
	combineURL(noticeSeq, keyselect, nowpage) {
		let defaultURL = 'https://recruit.wemakeprice.com/notice/view?';
			defaultURL += 'noticeSeq=' + noticeSeq;
			defaultURL += '&currentPage=1&screenTypeCd=0&searchType=title&searchWord=';

		return defaultURL;
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
			let noticeSeq = rawData.link[e].split('(')[1].split(')')[0];
			let newURL = this.combineURL(noticeSeq);

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

		let dataCommand = "let title = $('#noticeList tbody tr td.subject a').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
			dataCommand += "let link = $('#noticeList tbody tr td.subject a').map(function() {";
			dataCommand += "return $(this).attr('onclick');";
			dataCommand += "}).get();";
			dataCommand += "let period = $('#noticeList tbody tr td:nth-child(4)').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
			dataCommand += "";
			dataCommand += "return {";
			dataCommand += "title: title,";
			dataCommand += "link: link,";
			dataCommand += "period: period";
			dataCommand += "};";

		let getPageCountCommand = "return $('#pagingArea').children().length;";

		driver.get(url).catch((err) => {
			return;
		});
		driver.wait(until.titleContains('위메프'), 5000).catch((err) => {
			return;
		});
		let that = this;
		let totalPage = 0;

		driver.executeScript(getPageCountCommand).then((page) => {
			totalPage = page;
			(function pageIterator() {
				if(totalPage) {
					let clickCommand = "$('#pagingArea a:nth-child(" + totalPage + ")').click();";
					totalPage = totalPage - 1;
					driver.executeScript(clickCommand).then(() => {
						driver.executeScript(dataCommand).then(function(data) {
							that.refineData(data);
							pageIterator();
						}).catch((err) => {
							return;
						});
					}).catch((err) => {
						return;
					});
				}
			})();
		}).catch((err) => {
			return;
		});

		driver.quit();
	}
}
