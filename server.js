const express = require("express");
const path = require("path");

// initialize express app
const app = express();

// Serve static assets
app.use(express.static(path.join(__dirname, "public")));

// Load View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Home Route
app.get("/", (req, res) => {
  res.render("index");
});

// First time user Route
app.get("/baseline", (req, res) => {
  res.render("baseline");
});

// First time user about
app.get("/sobre", (req, res) => {
  res.render("sobre");
});

// Start Server
app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
