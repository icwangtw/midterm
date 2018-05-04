const accountSid = 'AC474791e99da95e1db10223773fb2f19e';
const key = require("./key.js")
const authToken = key.twilio_key
const client = require('twilio')(accountSid, authToken);

module.exports = notify = (estTime) => {
client.messages
  .create({
     body: `Thank you for your order! Your food will be ready in ${estTime} minutes.`,
     from: '+16043730358',
     to: key.swNumber //change to login telephone
   })
  .done();
}