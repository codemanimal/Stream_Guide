var express					 = require('express'),
		bodyParser			 = require('body-parser'),
		path						 = require('path'),
		logger					 = require('morgan'),
		bcrypt 					 = require('bcrypt'),
		session 				 = require('express-session'),
		videoRouter 		 = require('./routers/video_router.js'),
		userRouter 			 = require('./routers/user_router.js');

var app = express();
// require('dotenv').load();

// Server Configuration
if (process.env.NODE_ENV !== "test") {
	app.use( logger('dev') );
}
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );
app.use(session({
	secret: 'itfollows',
	resave: false,
	saveUninitialized: true
}));
app.use('/videos', videoRouter);
app.use('/users', userRouter);

app.listen(3000, function() {
	console.log('listening on 3000');
});

// FOR TESTING PURPOSES ONLY PLS DO NOT TAKE IT SERIOUSLY OK THANKS BYE
app.get('/debug_session', function(req, res) {
  res.send(req.session);
});
// --------------------------------------------------------------------

var restrictAccess = function(req, res, next) {
  var sessionID = parseInt( req.session.currentUser );
  var reqID = parseInt( req.params.id );

  sessionID === reqID ? next() : res.status(401).send({err: 401, msg: 'YOU SHALL NOT PASS!'});
};

var authenticate = function(req, res, next) {
  req.session.currentUser ? next() : res.status(400).send({err: 400, msg: 'LOGIN TROLL'});
};

// Export app as module
module.exports = app;