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
		this.app.get("/thread/:id", (req, res) => {
			var id = req.params.id;

			this.db.collection("news").findOne({_id: this.ObjectID(id)}, (e, data) => {
				this.db.collection("comments").find({parent: id}).toArray((e, comments) => {
					res.render("thread", {thread: data, comments: comments});
					console.log(comments);
				});
			});
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