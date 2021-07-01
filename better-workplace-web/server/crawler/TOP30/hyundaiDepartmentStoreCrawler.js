import Posting from '../../models/posting';
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var options = new chrome.Options();
	options.addArguments('headless', 'disable-gpu');

export default class hyundaiDepartmentStoreCrawler {
	constructor() {
		this.company = 'hyundaiDepartmentStore';
		this.name = '현대백화점그룹';
		this.links = [];
		this.url = 'https://recruit.ehyundai.com/recruit-info/announcement/list.nhd';
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
			driver.wait(until.titleContains('채용공고'), 5000).catch((err) => {
				return err;
			});

			let that = this;
			let getDataCommand = "return $('.paging.mt15 a:last-child').text();";

			driver.executeScript(getDataCommand).then((lastPage) => {
				that.links = [];
				for(let i = 1; i <= lastPage; i++) {
					that.links.push('https://recruit.ehyundai.com/recruit-info/announcement/list.nhd?hireGb=01&pageNo=' + i);
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
		let titleData = [], expireData = [], linkData = [];

		if(rawData.title === undefined || rawData.period === undefined) {
			console.log(this.company, 'refineData: rawData is not valid');
			return;
		}

        for(let e in rawData.affiliate) {
            let affiliatePart = rawData.affiliate[e].replace(/\n/g, '').replace(/\t/g, '').trim();
            let titlePart = rawData.title[e].replace(/\n/g, '').replace(/\t/g, '').trim();

            titleData.push(`[${affiliatePart}] ${titlePart}`);
        }

		for(let e in rawData.period) {
            let part = rawData.period[e].trim().replace('\t', '').replace('\n', '');
            if(part.split && part.split('~')[1] && part.split('~')[1].split && part.split('~')[1].split(' ')[0]) {
                if(part.split('~')[1].split(' ')[0] == '채용') {
                    expireData.push('채용시까지');
                } else {
                    expireData.push(part.split('~')[1].split(' ')[0]);
                }
            } else {
                expireData.push('채용시까지');
            }
		}

        for(let e in rawData.link) {
            let part = rawData.link[e];
            if(part.split && part.split('(')[1] && part.split('(')[1].split) {
                let defaultURL = 'https://recruit.ehyundai.com/recruit-info/announcement/view.nhd?hireId=';
                linkData.push(defaultURL + part.split('(')[1].split(')')[0]);
            } else {
                linkData.push(this.url);
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
				title: titleData[i],
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

        let dataCommand = "let affiliate = $('a.listUnit.recruit span.tit span.part').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
            dataCommand += "let title = $('a.listUnit.recruit span.txt span.type1').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
            dataCommand += "let period = $('a.listUnit.recruit span.txt span.type2').map(function() {";
			dataCommand += "return $(this).text();";
			dataCommand += "}).get();";
            dataCommand += "let link = $('a.listUnit.recruit').map(function() {";
            dataCommand += "return $(this)[0].pathname;";
            dataCommand += "}).get();";
			dataCommand += "";
			dataCommand += "return {";
            dataCommand += "affiliate: affiliate,";
			dataCommand += "title: title,";
			dataCommand += "period: period,";
            dataCommand += "link: link"
			dataCommand += "};";

		driver.get(url).catch((err) => {
			return;
		});
		driver.wait(until.titleContains('채용공고'), 5000).catch((err) => {
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
