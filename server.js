"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const app         = express();
const cookieParser = require('cookie-parser');
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const returnMenu = require("./routes/returnMenu");
const makeFoodOrder = require("./routes/makeFoodOrder");
const sendReadySMS = require("./routes/twilio_cready");
const sendTimeSMS = require("./routes/twilio_ctime");
const orderNotify = require("./routes/twilio_rorder");
const orderProcess = require("./routes/orderProcess");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
let orderId = "";

app.get("/", (req, res) => {
makeFoodOrder.generateOrder()
  .then((result) => {
    orderId = result;
    res.render("index", {
      foodEntree: returnMenu.catOne,
      foodSnack: returnMenu.catTwo,
      foodDrink: returnMenu.catThree,
      CustOrderId: orderId
    });
  });
});

//Cart confirmation
app.post("/confirm", (req, res) => {
  let wholeOrder = req.body;
  wholeOrder.cart.forEach(function(element) {
    makeFoodOrder.makeFoodOrder(orderId,element.id, element.qty);
  });
  orderProcess.addCInfo(wholeOrder.name, wholeOrder.phone)
  .then((result) => {
    orderProcess.customerOrder(result, orderId);
  });
  makeFoodOrder.foodName(orderId)
  .then((result) => {
    let content = "";
    result.forEach(function(element){
      content += element.name + " = " + element.quantity + ", ";
    });
    orderNotify(orderId, content);
 })
    res.cookie("orderId", orderId)
    res.json({result:"true"});
});


app.get("/confirm", (req, res) => {
  let orderId = req.cookies['orderId'];
  res.render("confirm", {orderNum: orderId});
});

//SMS routes
app.post("/sms", (req, res) => {
  let timeResponse = req.body.Body.slice(0, 2);
  let readyResponse = req.body.Body.slice(0, 5);
  if (readyResponse == 'Ready') {
    let orderNum = parseInt(req.body.Body.slice(6, 8));
    orderProcess.nowReady(orderNum)
    orderProcess.phoneNumLookup(orderNum)
    .then((result) => {
        sendReadySMS(JSON.stringify(result).slice(10, 22), orderNum)
    })
  }
  else {
    let orderNum = parseInt(req.body.Body.slice(3, 5));
    timeResponse = parseInt(timeResponse);
    orderProcess.insertPrepTime(orderNum, timeResponse);
    orderProcess.phoneNumLookup(orderNum)
    .then((result) => {
        sendTimeSMS(JSON.stringify(result).slice(10, 22), timeResponse)
    })
  }
  res.end();
});

app.get("/eta", (req, res) => {
  let thisUser = req.cookies['orderId'];
  orderProcess.checkTime(thisUser)
  .then((result) => {
      let etaTime = (JSON.stringify(result).slice(13, 15))
      if (etaTime !== "nu") {
        res.send(etaTime);
      } else {
        res.send('Not Ready');
      }
  });
});

app.get("/ready", (req, res) => {
  let thisUser = req.cookies['orderId'];
  orderProcess.statusCheck(thisUser)
  .then((result) => {
    let status = (JSON.stringify(result).slice(11, 16))
    console.log(status)
    if (status == 'ready') {
      res.send('pickup')
    } else {
      res.send('nopickup')
    }
  })
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
