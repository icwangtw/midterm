const accountSid = 'AC474791e99da95e1db10223773fb2f19e';
const key = require("./key.js")
const authToken = key.twilio_key
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Please respond with estimated time', //orderJOINfoods_order.knex
     from: '+16043730358',
     to: key.swNumber //change to restaurant telephone
   })
  .done();
