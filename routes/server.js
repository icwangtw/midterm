const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");

//middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  name: "session",
  keys: ["2o9UjHxdpd7PKrPFj0B1", "y28EbKtnaSaYpDGdTsth", "7igwx7myeIB9vbYncwJo"]
}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    let templateVars = {urls: filteredDatabase, theUser: usersDatabase[req.session.id]};
    res.render("urls_index", templateVars);
});
