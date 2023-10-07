const express = require("express");
const bodyParser = require('body-parser');
const ejs = require("ejs");

const apiRoutes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.set("view engine", "ejs");
ejs.delimiter = '%';

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoutes);
app.use(errorHandler); 

module.exports = app;