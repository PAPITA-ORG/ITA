const express = require("express");
const path = require("path");
const mongoKeys = require("./config/keys").MONGODB_URI;
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const routes = require("./routes");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
console.log(mongoKeys);
// initialize express app
const app = express();

// passport config
require("./config/passport")(passport);

// Serve static assets
app.use(express.static(path.join(__dirname, "public")));

// Parse json request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// use flash
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// use all routes
app.use(routes);

// Connect to MongoDB
mongoose
  .connect(mongoKeys, {
    useNewUrlParser: true,
    dbName: "ITA",
    useUnifiedTopology: true
  })
  .then(() => console.log("Mongo Database connected..."))
  .catch(err => err);

// Load View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on port 3000`);
});
