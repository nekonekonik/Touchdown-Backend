var express = require('express');
var bodyParser = require('body-parser');
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

app.post('/sms', function(req, res) {

    client.sendTo(process.env.TEST_RCVP_NUMBER, req.body);

    res.writeHead(200);
});

app.listen(3000);
module.exports = app;
