const accountSid = 'AC474791e99da95e1db10223773fb2f19e';
const key = require("./key.js")
const authToken = key.twilio_key
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Your food is ready!',
     from: '+16043730358',
     to: key.swNumber //change to login telephone
   })
  .done();
