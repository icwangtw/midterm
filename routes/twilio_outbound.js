const accountSid = 'AC474791e99da95e1db10223773fb2f19e';
const authToken = 'a129a21648676fff0752aacebfa793a4';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+16043730358',
     to: '+16047044397'
   })
  .then(message => console.log(message.sid))
  .done();
