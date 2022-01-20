const express = require("express");
const { expressHandlebars, engine } = require("express-handlebars");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const posts = require("./routes/posts");
const methodOverride = require("method-override");

//start app
const app = express();

//start handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

//init middleware
app.use(express.json());

//init bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//init MethodOverride middleware
app.use(methodOverride("_method"));

//connect to DB
connectDB();

//Render View
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));

//Router USE
app.use("/posts", posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Starting server at ${PORT}`));
