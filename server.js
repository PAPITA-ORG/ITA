const express = require("express");
const path = require("path");
const mongoKeys = require("./config/keys").MONGODB_URI;
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const routes = require("./routes");

// initialize express app
const app = express();

// Serve static assets
app.use(express.static(path.join(__dirname, "public")));

// Parse json request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
