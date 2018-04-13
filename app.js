var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var logger = require("logger");
var assets = require("connect-assets");
var flash = require("connect-flash");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var passport = require("passport");
var index = require("./routes/index");

var SetUpPassport = require("./auth/setuppassport");

var app = express();

mongoose.connect("mongodb://localhost:27017/naijageekdom");
var port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

SetUpPassport();

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(assets({
		helperContext: app.locals,
		paths: ["public"]
}));

app.use(session({
    secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    cookie: { maxAge: 24 * 24 * 60 * 60 }
  }));

app.use(express.static("public"));

app.use(passport.initialize());
app.use(flash());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  console.log(err);
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function(){
	console.log("Running");
});