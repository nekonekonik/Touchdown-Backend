// TWILIO

// Load the twilio module
var twilio = require('twilio');
//var config = require('./config');
 
// Create a new REST API client to make authenticated requests against the
// twilio back end
var client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

client.sendInFiveMin = function() {
    client.sendTo(process.env.TEST_RCVP_NUMBER, 'Your driver, Nicholette, is arriving in 5 minutes!');
};

client.sendWhenReached = function() {
    client.sendTo(process.env.TEST_RCVP_NUMBER, 'Your driver, Nicholette, has arrived!');
};

client.sendTo = function(recpNum, msg) {
    client.messages.create({ 
        to: recpNum, 
        from: process.env.TWILIO_NUMBER, 
        body: msg
    }, function(err, message) { 
        console.log(err);
        console.log(message); 
    });
};

module.exports = client;