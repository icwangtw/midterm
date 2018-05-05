"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const returnMenu = require("./routes/returnMenu");
const makeFoodOrder = require("./routes/makeFoodOrder")
const sendReadySMS = require("./routes/twilio_cready")
const sendTimeSMS = require("./routes/twilio_ctime")
const orderNotify = require("./routes/twilio_rorder")
const orderProcess = require("./routes/orderProcess")

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));
app.set("view engine", "ejs");
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
let orderId = ""

app.get("/", (req, res) => {
    let templateVars = {
    	foodEntree: returnMenu.catOne,
      foodSnack: returnMenu.catTwo,
      foodDrink: returnMenu.catThree,
    };
<<<<<<< HEAD

=======
>>>>>>> 89748beb2435a47311af8e730e805d13798ac027
    makeFoodOrder.generateOrder()
      .then((result) => {
        orderId = result
        res.render("index", templateVars);
      })
    });

<<<<<<< HEAD
// //Ordering food
app.post("/orders", (req, res) => {
  let food_id = req.body.id.slice(4);
  let quantity = req.body.amount.slice(4);
  console.log(food_id, quantity)
  console.log(orderId)
  makeFoodOrder.makeFoodOrder(orderId, food_id, quantity);
    res.render("index", templateVars);
});

app.post("/orders", (req, res) => {
  console.log("psoting req orders body", req.body);
  // res.send(req.body);
  res.send();
});

app.get("/orders/:orderid", (req, res) => {
  // temporary todo: generate (random) data and send that?
  // TODO: get the data
  // TODO: send the data to the front end, d00d
  
});

//Show complete order
app.post("/orders/id", (req, res) => {
    makeFoodOrder.orderTotal(orderId) 
      .then((allTheOrders) => {
        templateVars = { totalOrder: allTheOrders }
        res.render("index", templateVars);
    })
})

=======
>>>>>>> 89748beb2435a47311af8e730e805d13798ac027
app.post("/confirm", (req, res) => {
  let cName = req.body.name
  let cPhone = req.body.phone
  makeFoodOrder.addCInfo(cName, cPhone)
  .then((result) => {
    // associate result to orderdb
  })
  //take in customer name and phone and add to database
  makeFoodOrder.orderTotal(orderId)
  .then((result) => {
      orderNotify(orderId, result)
  })
})

app.get("/confirm", (req, res) => {
  //what do we need in tempate Vars?
  res.render("confirm", templateVars)
})


app.post("/sms", (req, res) => {
  let timeResponse = req.body.Body.slice(0, 2)
  let readyResponse = req.body.Body.slice(0, 5)
  if (readyResponse == 'Ready') {
    let orderNum = parseInt(req.body.Body.slice(6, 8))
    orderProcess.phoneNumLookup(orderNum)
    .then((result) => {
        sendReadySMS(JSON.stringify(result).slice(10, 22), orderNum)
    })
    //ajaxcall at confirmation page to ready
  }
  else {
    let orderNum = parseInt(req.body.Body.slice(3, 5))
    timeResponse = parseInt(timeResponse);
    orderProcess.insertPrepTime(orderNum, timeResponse);
    orderProcess.phoneNumLookup(orderNum)
    .then((result) => {
        sendTimeSMS(JSON.stringify(result).slice(10, 22), timeResponse)
    })
    //pass repondTime to confirmation page and do a ajax call there
  }
  res.end();
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
