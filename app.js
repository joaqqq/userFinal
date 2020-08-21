const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override");

/* connect to mongodb database using mongoose */
mongoose.connect('mongodb://localhost:27017/library_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

/* use public directory for all links */
app.use(express.static("public"));

/* body parser */
app.use(bodyParser.urlencoded({ extended: true }));

/* method override for post request to make update and delete */
app.use(methodOverride("_method"));

/* set views to ejs */
app.set("view engine", "ejs");


