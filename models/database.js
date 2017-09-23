const MongoClient = require("mongodb").MongoClient;
const Model = require("./model");

class Database extends Model {
	constructor(host, user, pass, port, dbname) {
		super();
		this.db = null;
		this.connected = false;
		this.url = `mongodb://${user}:${pass}@${host}:${port}/${dbname}`;
	}

	connect(callback) {
		if (!this.connected)
		MongoClient.connect(this.url, (error, db) => {
			if (error) {
				console.log("Database connect error".red);
				return;
			}

			console.log("Database connect success".green);
			this.db = db;
			this.connected = true;
			callback(this.db);
		});

		return this.db;
	}
}

module.exports = Database;