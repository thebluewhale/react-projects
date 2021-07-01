import fs from 'fs';

export default class DataManager {
	constructor() {
		this.jsonPath = __dirname + '/data.json';
		this.data;
		this.readDataFromJson = this.readDataFromJson.bind(this);
	}

	readDataFromJson() {
		fs.exists(this.jsonPath, (exists) => {
			if(exists) {
				this.data = JSON.parse(fs.readFileSync(this.jsonPath));
				console.log(this.data);
			}
		});
	}
}
