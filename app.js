var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.json());

var routes = require('./routes/index');

var quotes = [
  { author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
  { author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
  { author : 'Unknown', text : "Even the greatest was once a beginner. Don't be afraid to take that first step."},
  { author : 'Neale Donald Walsch', text : "You are afraid to die, and you're afraid to live. What a way to exist."}
];

app.get('/', function(req, res) {
  res.type('text/plain'); // set content-type
  res.send('i am a beautiful butterfly'); // send text response
});


app.get('/quote/:id', function(req, res) {
  if(quotes.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }  
  var q = quotes[req.params.id];
  res.json(q);
});

app.post('/quote', function(req, res) {
  if(!req.body.hasOwnProperty('author') || 
     !req.body.hasOwnProperty('text')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  } 
 
  var newQuote = {
      author : req.body.author,
      text : req.body.text
    }; 
   
  quotes.push(newQuote);
    res.json(true);
});

app.delete('/quote/:id', function(req, res) {
  if(quotes.length <= req.params.id) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }  

  quotes.splice(req.params.id, 1);
  res.json(true);
});

var client = require('./client');

// app.post('/test', function(req, res) {
//   console.log('req', req);
//   res.status(200);
// });

var querystring = require('querystring');

app.post('/sms', function(req, res) {
    console.log(req.body.message);
    var form = { To: process.env.TEST_RCVP_NUMBER, From: process.env.TWILIO_NUMBER, Body: req.body.message };
    var formData = querystring.stringify(form);
    var contentLength = formData.length;
    var auth = "Basic " + new Buffer(process.env.TWILIO_ACCOUNT_SID + ":" + process.env.TWILIO_AUTH_TOKEN).toString("base64");

    var options = {
      method: 'post',
      form: formData, // Javascript object
      //json: true, // Use,If you are sending JSON data
      //url: 'https://touchdownhero.herokuapp.com/test',
      url: 'https://api.twilio.com/2010-04-01/Accounts/' + process.env.TWILIO_ACCOUNT_SID + '/Messages',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': contentLength,
        'Authorization' : auth
      }
      // authorization : {
      //   username: process.env.TWILIO_ACCOUNT_SID,
      //   password: process.env.TWILIO_AUTH_TOKEN
      // }
    }

    request(options, function (err, res, body) {
      console.log(options);
      if (err) {
        console.log('Error :' ,err)
        return;
      }     
      console.log('res', res);
      console.log(' Body :',body)

    });

    res.writeHead(200);
});


app.listen(3000);
module.exports = app;
