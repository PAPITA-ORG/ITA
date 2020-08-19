const express = require("express");
const path = require("path");
require("dotenv").config();
const mongoKeys = process.env.MONGODB_URI;
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const routes = require("./routes");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");

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

// app._router.stack.forEach(print.bind(null, []))

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on port 3000`);
});

// function print(path, layer) {
//   if (layer.route) {
//     layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
//   } else if (layer.name === 'router' && layer.handle.stack) {
//     layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
//   } else if (layer.method) {
//     console.log('%s /%s',
//       layer.method.toUpperCase(),
//       path.concat(split(layer.regexp)).filter(Boolean).join('/'))
//   }
// }

// function split(thing) {
//   if (typeof thing === 'string') {
//     return thing.split('/')
//   } else if (thing.fast_slash) {
//     return ''
//   } else {
//     var match = thing.toString()
//       .replace('\\/?', '')
//       .replace('(?=\\/|$)', '$')
//       .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
//     return match
//       ? match[1].replace(/\\(.)/g, '$1').split('/')
//       : '<complex:' + thing.toString() + '>'
//   }
// }
