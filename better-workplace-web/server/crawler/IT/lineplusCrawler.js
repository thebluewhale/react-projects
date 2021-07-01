import Posting from '../../models/posting';
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var options = new chrome.Options();
	options.addArguments('headless', 'disable-gpu');

export default class lineplusCrawler {
	constructor() {
		this.company = 'lineplus';
		this.name = '라인플러스';
		this.links = [];
		this.url = 'http://recruit.linepluscorp.com/lineplus/career/list?classId=&entTypeCd=&page=1';
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
			var driver = new webdriver.Builder()
							.withCapabilities(webdriver.Capabilities.chrome())
							.setChromeOptions(options)
							.build();

			driver.get(this.url).catch((err) => {
				return err;
			});
			driver.wait(until.titleContains('LINE'), 5000).catch((err) => {
				return err;
			});

			let that = this;
			let getDataCommand = "return $('div.board_paging a:last-child').text();";

			(function pageIterator() {
				driver.wait(until.elementLocated(By.className('b_next')), 5000)
				.then(() => {
					driver.findElement(By.className('b_next')).then((button) => {
						button.click().catch((err) => {
							return err;
						});
					}).catch((err) => {
						return err;
					});
					pageIterator();
				}).catch((err) => {
					/* iterator done */
				});
			})();

			driver.executeScript(getDataCommand).then((lastPage) => {
				that.links = [];
				for(let i = 0; i <= lastPage; i++) {
					that.links.push('http://recruit.linepluscorp.com/lineplus/career/list?classId=&entTypeCd=&page=' + i);
				}
			}).catch((err) => {
				return err;
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
			let defaultURL = 'http://recruit.linepluscorp.com';
			linkData.push(defaultURL + rawData.link[e]);
		}

		for(let e in rawData.period) {
			let expire = rawData.period[e].trim();
			if(expire === '') {
				expire = 'UNDEFINED';
			} else {
				if(expire.includes('~')) {
					expire = expire.split('~')[1].trim();
				} else {
					expire = 'UNDEFINED';
				}
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

		let dataCommand = "let title = $('.jobs_table tr .td_tit a').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
			dataCommand += "let link = $('.jobs_table tr .td_tit a').map(function() {";
			dataCommand += "return $(this).attr('href');";
			dataCommand += "}).get();";
			dataCommand += "let jobGroup = $('.jobs_table tr .td_cat').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
			dataCommand += "let period = $('.jobs_table tr td:nth-child(5)').map(function() {";
			dataCommand += "return $(this).text()";
			dataCommand += "}).get();";
			dataCommand += "";
			dataCommand += "return {";
			dataCommand += "title: title,";
			dataCommand += "link: link,";
			dataCommand += "jobGroup: jobGroup,";
			dataCommand += "period: period";
			dataCommand += "};";

		driver.get(url).catch((err) => {
			return err;
		});
		driver.wait(until.titleContains('LINE'), 5000).catch((err) => {
			return err;
		});
		let that = this;
		driver.executeScript(dataCommand).then(function(data) {
			that.refineData(data);
		}).catch((err) => {
			return err;
		});

		driver.quit();
	}
}
