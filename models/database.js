const MongoClient = require('mongodb').MongoClient

class Database {
	constructor(host, user, pass, dbname) {
		this.db = null;
		this.connected = false;
		this.url = `mongodb://${user}:${pass}@${host}:27017/${dbname}`;
	}

	connect(callback) {
		MongoClient.connect(this.url, (e, db) => {
			this.db = db;
			callback(this.db);
		});

		return this.db;
	}
}

module.exports = Database;