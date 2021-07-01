import Posting from '../models/posting';
/* TOP 30 companies */
import cjCrawler from './TOP30/cjCrawler';
import samsungCrawler from './TOP30/samsungCrawler';
import ktCrawler from './TOP30/ktCrawler';
import lgCrawler from './TOP30/lgCrawler';
import skCrawler from './TOP30/skCrawler';
import lotteCrawler from './TOP30/lotteCrawler';
import hyundaiMotorsCrawler from './TOP30/hyundaiMotorsCrawler';
import hanwhaCrawler from './TOP30/hanwhaCrawler';
import hyundaiHeavyIndustriesCrawler from './TOP30/hyundaiHeavyIndustriesCrawler';
import poscoCrawler from './TOP30/poscoCrawler';
import shinsegaeCrawler from './TOP30/shinsegaeCrawler';
import doosanCrawler from './TOP30/doosanCrawler';
import booyoungCrawler from './TOP30/booyoungCrawler';
import lsCrawler from './TOP30/lsCrawler';
import daewooShipbuildingCrawler from './TOP30/daewooShipbuildingCrawler';
import kumhoAsianaCrawler from './TOP30/kumhoAsianaCrawler';
import hyundaiDepartmentStoreCrawler from './TOP30/hyundaiDepartmentStoreCrawler';
import soilCrawler from './TOP30/soilCrawler';
/* IT Companies */
import naverCrawler from './IT/naverCrawler';
import kakaoCrawler from './IT/kakaoCrawler';
import lineplusCrawler from './IT/lineplusCrawler';
import appleKoreaCrawler from './IT/appleKoreaCrawler';
import coupangCrawler from './IT/coupangCrawler';
import ebayKoreaCrawler from './IT/ebayKoreaCrawler';
import neopleCrawler from './IT/neopleCrawler';
import neowizCrawler from './IT/neowizCrawler';
import nexonCrawler from './IT/nexonCrawler';
import nexonGTCrawler from './IT/nexonGTCrawler';
import tmonCrawler from './IT/tmonCrawler';
import ncsoftCrawler from './IT/ncsoftCrawler';
import wemadeCrawler from './IT/wemadeCrawler';
import netmarbleCrawler from './IT/netmarbleCrawler';
import wemakepriceCrawler from './IT/wemakepriceCrawler';
import nhnEntCrawler from './IT/nhnEntCrawler';

export default class crawlerMain {
	constructor() {
		this.companies = [
			appleKoreaCrawler, cjCrawler, coupangCrawler, ebayKoreaCrawler,
			kakaoCrawler, ktCrawler, lgCrawler, lineplusCrawler, lotteCrawler,
			naverCrawler, ncsoftCrawler, neopleCrawler, neowizCrawler,
			netmarbleCrawler, nexonCrawler, nexonGTCrawler, nhnEntCrawler,
			samsungCrawler, skCrawler, /*tmonCrawler,*/ wemadeCrawler, wemakepriceCrawler,
			hanwhaCrawler, hyundaiMotorsCrawler, hyundaiHeavyIndustriesCrawler,
			poscoCrawler, shinsegaeCrawler, doosanCrawler, booyoungCrawler,
			lsCrawler, daewooShipbuildingCrawler, kumhoAsianaCrawler, hyundaiDepartmentStoreCrawler,
			soilCrawler
		];
		this.startCrawling = this.startCrawling.bind(this);
		this.setTimeoutForCrawling = this.setTimeoutForCrawling.bind(this);
	}

	setTimeoutForCrawling(i, randomIndex) {
		setTimeout(() => {
			let companyObj = new this.companies[randomIndex]();
			companyObj.start();
			console.log(companyObj.company, 'crawling start', (i*10), 'secs after launch');
		}, i * 10000);
	}

	startCrawling() {
		let totalCount = this.companies.length;
		let randomSeed = Math.floor(Math.random() * totalCount) + 1;

		/* crawling just after launch the app
		 * if default, wemakeprice postings are always on top of page.
		 * for prevent this situation, crawling order is mixed with random seed.
		 */
		for(let i = 0; i < totalCount; i++) {
			this.setTimeoutForCrawling(i, ((randomSeed + i) % totalCount));
		}

		/* crawling per 24 hours */
		setInterval(() => {
			for(let i = 0; i < totalCount; i++) {
				this.setTimeoutForCrawling(i);
			}
		}, (24 * 60 * 60 * 1000));
	}
}
