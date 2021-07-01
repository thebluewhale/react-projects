import Posting from '../../models/posting';
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var options = new chrome.Options();
	options.addArguments('headless', 'disable-gpu');

export default class shinsegaeCrawler {
	constructor() {
		this.company = 'shinsegae';
		this.name = '신세계';
		this.links = [];
		this.url = 'http://job.shinsegae.com/recruit_info/notice/notice01_list.jsp?';
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
			driver.wait(until.titleContains('신세계'), 5000).catch((err) => {
				return err;
			});

			let that = this;
            let getDataCommand = "return $('div.pagination span:last-child').length;"

			driver.executeScript(getDataCommand).then((lastPage) => {
				for(let i = 1; i <= lastPage; i++) {
                    let query = 'rowsPerPage=11&currentPage=' + i;
					that.links.push(that.url + query);
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

		if(rawData.title === undefined || rawData.period === undefined) {
			console.log(this.company, 'refineData: rawData is not valid');
			return;
		}

		for(let e in rawData.link) {
            if(rawData.link[e].split && rawData.link[e].split('_moveView(')[1].split) {
                let defaultURL = 'http://job.shinsegae.com/recruit_info/notice/notice01_view.jsp?';
                let query = 'notino=' + rawData.link[e].split('_moveView(')[1].split(',')[0];
                linkData.push(defaultURL + query);
            } else {
                linkData.push(this.url);
            }
		}

		for(let e in rawData.period) {
            if(rawData.period[e].split) {
                expireData.push(rawData.period[e].split('~')[1]);
            } else {
                expireData.push('채용시까지');
            }
		}

		if(rawData.title.length !== expireData.length) {
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

		let dataCommand = "let title = $('#content table td.title').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
            dataCommand += "let period = $('#content table td.date').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
            dataCommand += "let link = $('#content table td.title').map(function() {";
            dataCommand += "return $(this)[0].outerHTML;";
            dataCommand += "}).get();"
			dataCommand += "";
			dataCommand += "return {";
			dataCommand += "title: title,";
			dataCommand += "period: period,";
            dataCommand += "link: link";
			dataCommand += "};";

		driver.get(url).catch((err) => {
			return;
		});
		driver.wait(until.titleContains('신세계'), 5000).catch((err) => {
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
