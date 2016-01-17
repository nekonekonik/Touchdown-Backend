// TWILIO

// Load the twilio module
var twilio = require('twilio');
//var config = require('./config');
 
// Create a new REST API client to make authenticated requests against the
// twilio back end
var client = new twilio.RestClient(ENV[TWILIO_ACCOUNT_SID], ENV[TWILIO_AUTH_TOKEN]);

client.sendInFiveMin = function() {
    client.sendTo(ENV[PERSONAL_NUMBER], 'Your driver, Nicholette, is arriving in 5 minutes!');
};

client.sendWhenReached = function() {
    client.sendTo(ENV[PERSONAL_NUMBER], 'Your driver, Nicholette, has arrived!');
};

client.sendTo = function(recpNum, msg) {
    client.messages.create({ 
        to: recpNum, 
        from: ENV[TWILIO_NUMBER], 
        body: msg
    }, function(err, message) { 
        console.log(err);
        console.log(message); 
    });
};

module.exports = client;