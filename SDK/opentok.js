var OpenTok 	= require('opentok'),
	apiKey  	= '45572472',
	apiSecret  	= '27c443bb2bd3098d39bf11c7c303f83b15935ec8',
	opentok 	= new OpenTok(apiKey, apiSecret);

var sessionID;
// Create a session that will attempt to transmit streams directly between
// clients. If clients cannot connect, the session uses the OpenTok TURN server:
exports.makeSession = function(callback) {
	opentok.createSession(function(err, session) {
	  if (err) return console.log(err);
	  sessionID = session.sessionId;
	  callback(sessionID)
	});
}

exports.makeToken = function(req, callback) {
	sessionId = req.sessionID;
	token = opentok.generateToken(sessionId)
	sesToken = {'apiKey': apiKey, 'sessionID':sessionId, 'token':token};
	callback(req, sesToken);
	
}

