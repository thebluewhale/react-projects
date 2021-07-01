import Channel from '../models/channel';
import timetableCrawler from './timetableCrawler';
import ChannelDB from './channelDB';

export default class crawlerMain {
	constructor() {
		this.startCrawling = this.startCrawling.bind(this);
		this.setTimeoutForCrawling = this.setTimeoutForCrawling.bind(this);
		this.channelDB = []
		this.DB = [];
	}

	startCrawling() {
		this.channelDB = new ChannelDB();
		this.channelDB.initChannelDB();

		this.DB = this.channelDB.getChannelDB();
		let dbLength = this.channelDB.getChannelDBLength();

		/* crawling per 15 minutests */
		let _this = this;
		let i = 0;
		//setInterval(() => {
		setTimeout(() => {
			for (let i = 0; i < dbLength; i++) {
				_this.setTimeoutForCrawling(i);
			}
		}, 5000);
		//}, (1000 * 60 * 15));
	}

	setTimeoutForCrawling(index) {
		let _this = this;
		setTimeout(() => {
			let crawler = new timetableCrawler();
			let obj = _this.DB[index];
			crawler.start(obj.provider, obj.main, obj.number, this.channelDB.getChannelDBLength(), index);
		}, index * 1000)
	}
}
