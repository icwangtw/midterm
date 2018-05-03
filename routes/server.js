const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
const MessagingResponse = require('twilio').twiml.MessagingResponse;

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({
  name: "session",
  keys: ["2o9UjHxdpd7PKrPFj0B1", "y28EbKtnaSaYpDGdTsth", "7igwx7myeIB9vbYncwJo"]
}));
app.set("view engine", "ejs");

//render menu
app.get("/", (req, res) => {
    let templateVars = {};
    res.render("index", templateVars);
});

//sms inbound

//sms outbound

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
