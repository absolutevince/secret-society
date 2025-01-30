require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

const TITLE = "Who Note?";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: TITLE });
});
app.get("/login", (req, res) => {
  res.render("login", { title: TITLE });
});
app.get("/register", (req, res) => {
  res.render("register", { title: TITLE });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Express at Port: " + port));
