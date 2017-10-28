const Controller = require("./controller");

class Router extends Controller {
	constructor(app) {
		super();

		this.db = null;
		this.app = app;
	}

	database(database) {
		this.db = database;
	}

	// ROUTING

	home() {
		this.app.get("/", (req, res) => {
			this.db.collection("news").find().toArray((e, data) => {
				res.render("index", {data: data});
			});
		});
	}

	thread() {
		this.app.get("/thread", (req, res) => {
			console.log("THREAD");
		});
	}

	dima() {
		this.app.get("/dima", (req, res) => {
			res.send("DIMA").end();
		});
	}

	insert() {
		this.db.collection("news").insert({
			name: "Thread addition page",
			text: "Hello World!",
			author: "CHROM",
			date: "28.10.2017"
		});
	}
}

module.exports = Router;