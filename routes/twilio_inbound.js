const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  if (typeof(parseint(req.body.Body))) === number {
    let respondTime = parseInt(req.body.Body)
    //call outbound SMS function - time
    //pass repondTime to confirmation page and do a ajax call there
  }
  else if (req.body.Body == 'Ready') {
    //call outbound SMS function - ready
    //do a ajax call there at confirmation page
  }
  else { twiml.message('Unable to recognize message');
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

http.createServer(app).listen(6060, () => {
  console.log('Express server listening on port 6060');
});
