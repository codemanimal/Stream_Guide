var application_root = __dirname,
		express					 = require('express'),
		bodyParser			 = require('body-parser'),
		path						 = require('path'),
		logger					 = require('morgan'),
		bcrypt 					 = require('bcrypt'),
		session 				 = require('express-session'),
		models					 = require('./models'),
		Video 					 = models.videos,
		User 						 = models.users;
		// videoRouter 		 = require('./routers/video_router.js'),
		// userRouter 			 = require('./routers/user_router.js');

var app = express();
// require('dotenv').load();

// Server Configuration
if (process.env.NODE_ENV !== "test") {
	app.use( logger('dev') );
}

app.use( express.static( path.join( application_root, 'public' ) ) );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

app.use(session({
	secret: 'itfollows',
	resave: false,
	saveUninitialized: true
}));
// app.use('/videos', videoRouter);
// app.use('/users', userRouter);

// Routes

// GET all videos from videos table
app.get('/videos', function(req, res) {
	Video
		.findAll()
		.then(function(videos) {
			res.send(videos);
		});
});

// Create a user
app.post('/users', function(req, res) {
	var username  = req.body.username,
			password  = req.body.password,
			name 		  = req.body.name,
			email 	  = req.body.email,
			birthdate = req.body.birthdate,
			city 			= req.body.city,
			state 		= req.body.state;

	bcrypt.hash(password, 10, function(err, hash) {
		User
			.create({
				username: username,
				password_digest: hash,
				name: name,
				email: email,
				birthdate: birthdate,
				city: city,
				state: state
			})
			.then(function(user) {
				res.send(user);
			});
	});
});

// Add Video to current session user

//Sessions

// FOR TESTING PURPOSES
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

app.post('/sessions', function(req, res) {
  var loginUsername = req.body.username;
  var loginPassword = req.body.password;

  // Try to find the user
  User
    .findOne({
      where: { username: loginUsername }
    })
    .then(function(user) {
      // If the user exists
      if (user) {
        // Check their password
        var passwordDigest = user.password_digest;

        // Use bcrypt to compare
        bcrypt.compare(loginPassword, passwordDigest, function(err, result) {
          // If we have a match
          if (result) {
            // Store the user's id in the session
            req.session.currentUser = user.id;
            res.send('Correct credentials!!');
          // If we do NOT have a match
          } else {
            // If the password is incorrect
            res.status(400);
            res.send({
              err: 400,
              msg: 'Wrong password buddy.'
            });
          }
        });
      // If the user doesn't exist
      } else {
        res.status(400);
        res.send({
          err: 400,
          msg: 'Username does not exist!'
        });
      }
    });
});

app.delete('/sessions', function(req, res) {
  delete req.session.currentUser;
  res.send('Successfully logged out.');
});

app.listen(3000, function() {
	console.log('listening on 3000');
});

// Export app as module
module.exports = app;