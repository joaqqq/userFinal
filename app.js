const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override");

/* connect to mongodb database using mongoose */
mongoose.connect('mongodb://localhost:27017/users_db', {
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

/* create the schema */
const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
});

/* create object */
const User = mongoose.model("User", userSchema);

app.get("/", function (req, res) {
    res.redirect("/users");
});

app.get("/users", function (req, res) {
    Book.find({}, function (err, user) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", { user: user });
        }
    });
});

app.get("/users/new", function(req, res) {
    if(err) {
        console.log(err);
    }
    else {
        res.render("new");
    }
});

app.post("/users", function(req, res) {
    User.create(req.body.user, function(err, newUser) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/users");
        }
    });
});

app.get("/users/:id", function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("show", { user: user });
        }
    });
});

app.get("/users/:id/edit", function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("edit", { user: user });
        }
    });
});

app.put("/users/:id", function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body.user, function (err, user) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/users/" + req.params.id);
        }
    });
});

app.delete("/users/:id", function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/users");
        }
        else {
            res.redirect("/users");
        }
    })
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server Has Started!");
});


