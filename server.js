const express = require("express");
const colors = require("colors");
const ejs = require("ejs");
const config = require("./config.json");

// VARIABLES
const DIR = __dirname;
const app = express();

//Controllers
var MainController = new (require("./controllers/main_controller.js"))();
var RouterController = new (require("./controllers/router_controller.js"))(app);

//MODELS
var db = new (require("./models/database"))(config.db_host, config.db_user, config.db_pass, config.db_port, config.db_name).connect((database) => {
	RouterController.database(database);
	db = database;

	//RouterController.insert();
});

	
// SETTINGS
app.use(express.static(DIR + "/static"));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

ejs.delimiter = '?';


// ROUTING
RouterController.home();
RouterController.thread();


// STARTING
app.listen(8000, () => {
	console.log("Server started!".green);
});