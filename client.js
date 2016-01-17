// TWILIO

// Load the twilio module
var twilio = require('twilio');
//var config = require('./config');
 
// Create a new REST API client to make authenticated requests against the
// twilio back end
var client = new twilio.RestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

client.sendInFiveMin = function() {
    client.sms.messages.create({
        to: PERSONAL_NUMBER,
        from: TWILIO_NUMBER,
        body:'Your driver, Nicholette, is reaching in 5 minutes!'
    }, function(error, message) {
        if (!error) {
            console.log('Success! The SID for this SMS message is:');
            console.log(message.sid);
     
            console.log('Message sent on:');
            console.log(message.dateCreated);
        } else {
            console.log(error);
            console.log('Oops! There was an error.');
        }
    });
}

client.sendWhenReached = function() {
    client.sms.messages.create({
        to: PERSONAL_NUMBER,
        from: TWILIO_NUMBER,
        body:'Your driver, Nicholette, has reached!'
    }, function(error, message) {
        if (!error) {
            console.log('Success! The SID for this SMS message is:');
            console.log(message.sid);
     
            console.log('Message sent on:');
            console.log(message.dateCreated);
        } else {
            console.log(error);
            console.log('Oops! There was an error.');
        }
    });
}

client.sendTo = function(recpNum, msg) {
    client.messages.create({ 
        to: recpNum, 
        from: TWILIO_NUMBER, 
        body: msg
    }, function(err, message) { 
        console.log(err);
        console.log(message); 
    });
}

client.sendTo(TEST_RCVP_NUMBER, 'Hey! I\'m here to pick you up. Are you ready for superbowl? :D');

module.exports = client;