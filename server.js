const express = require("express");
const colors = require("colors");
const ejs = require("ejs");
const config = require("./config.json");

// VARIABLES
const DIR = __dirname;
const app = express();


//MODELS
const Database = require("./models/database");
var db = new Database(config.db_host, config.db_user, config.db_pass, config.db_name).connect((database) => {db = database});

	
// SETTINGS
app.use(express.static(DIR + "/static"));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

ejs.delimiter = '?';


// ROUTING
app.get("/", (req, res) => {
	db.collection("news").findOne((e, item) => {
		res.send(item).end();
	});
});


// STARTING
app.listen(8000, () => {
	console.log("Server started!".green);
});