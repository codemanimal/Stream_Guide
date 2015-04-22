var application_root = __dirname,
		express					 = require('express'),
		bodyParser			 = require('body-parser'),
		path						 = require('path'),
		logger					 = require('morgan'),
		bcrypt 					 = require('bcrypt'),
		session 				 = require('express-session'),
		models					 = require('./models'),
    DM               = require('dailymotion-sdk'),
    Video            = models.videos,
    User             = models.users;
		// videoRouter 		 = require('./routers/video_router.js'),
		// userRouter 			 = require('./routers/user_router.js');

var app = express();
// require('dotenv').load();

// DailyMotion suggested syntax for instantiating module
// DM.init({
//     apiKey: 'e542a26cabdfbdec523c',
//     status: true, // check login status
//     cookie: true // enable cookies to allow the server to access the session
// });

// Server Configuration
if (process.env.NODE_ENV !== "test") {
	app.use( logger('dev') );
}

app.use( express.static( path.join( application_root, 'public' ) ) );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );
// app.use('/videos', videoRouter);
// app.use('/users', userRouter);

app.use(session({
  secret: 'itfollows',
  resave: false,
  saveUninitialized: true
}));

// Routes

// GET Daily Motion videos
// DM.api('/videos',
//   { fields: 'audience,bookmarks_total,broadcasting,channel,country,description,duration_formatted,embed_html,end_time,explicit,id,language,metadata_credit_actors,metadata_credit_director,metadata_genre,metadata_original_title,onair,owner.url,poster_url,recurrence,start_time,status,tags,thumbnail_url,title,url,views_last_day,views_last_hour,views_last_month,views_last_week,views_total', 
//     flags: 'live', sort: 'live-audience', limit: 100
//   },
//   function(error, response, body) {
//     var results = body.data;
//     res.send(results);
// });

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
// app.post('/users/:id/videos', authenticate, restrictAccess, function(req, res) {
//   var userID = req.session.currentUser;
//   User.
//     .findOne(userID)
//     .then(function(user) {
//       user
//         .addVideo({
//           video_id: req.params.id
//         }).then(function(video) {
//           res.send(video);
//         });
//     });
// });

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