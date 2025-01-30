require("dotenv").config();
const express = require("express");
const path = require("path");
const { title } = require("./lib/variables");
const indexRouter = require("./router/indexRouter");
const loginRouter = require("./router/loginRouter");
const registerRouter = require("./router/registerRouter");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/login", loginRouter);

app.use("/register", registerRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Express at Port: " + port));
