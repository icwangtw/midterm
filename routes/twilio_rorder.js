const accountSid = 'AC474791e99da95e1db10223773fb2f19e';
const key = require("./key.js");
const authToken = key.twilio_key;
const client = require('twilio')(accountSid, authToken);

module.exports = notify = (orderId, orderString) => {
client.messages
  .create({
     body: `OrderID: ${orderId}, ${orderString} Please respond with time estimate.`,
     from: '+16043730358',
     to: key.swNumber //change to restaurant telephone
   })
  .done();
};
