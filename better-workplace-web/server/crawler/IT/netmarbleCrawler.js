import Posting from '../../models/posting';
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var options = new chrome.Options();
	options.addArguments('headless', 'disable-gpu');

export default class netmarbleCrawler {
	constructor() {
		this.company = 'netmarble';
		this.name = '넷마블';
		this.links = [];
		this.url = 'https://www.netmarble.com/rem/www/noticelist.jsp';
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
			let defaultURL = 'https://www.netmarble.com/rem/www/notice.jsp?';
			let newURL = rawData.link[e].split('?')[1];
			linkData.push(defaultURL + newURL);
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

		let dataCommand = "let title = $('ul.recruit_list li a span.cw_title').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
			dataCommand += "let link = $('ul.recruit_list li a').map(function() {";
			dataCommand += "return $(this).attr('href');";
			dataCommand += "}).get();";
			dataCommand += "let period = $('ul.recruit_list li a span.cw_range').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
			dataCommand += "";
			dataCommand += "return {";
			dataCommand += "title: title,";
			dataCommand += "link: link,";
			dataCommand += "period: period";
			dataCommand += "};";

		let getPageCountCommand = "let current = $('.page_current').text();";
			getPageCountCommand += "let total = $('#pageCount').text();";
			getPageCountCommand += "return { current: current, total: total };";

		driver.get(url).catch((err) => {
			return;
		});
		driver.wait(until.titleContains('넷마블'), 5000).catch((err) => {
			return;
		});
		let that = this;

		(function pageIterator() {
			driver.executeScript(getPageCountCommand).then((pageChecker) => {
				let current = pageChecker.current;
				let total = pageChecker.total;
				if(current < total) {
					driver.executeScript(dataCommand).then((data) => {
						that.refineData(data);
						driver.findElement(By.className('page_next')).click().then(() => {
							pageIterator();
						});
					});
				} else {
					driver.executeScript(dataCommand).then((data) => {
						that.refineData(data);
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
