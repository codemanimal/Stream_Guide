var application_root = __dirname,
		express					 = require('express'),
		bodyParser			 = require('body-parser'),
		path						 = require('path'),
		logger					 = require('morgan'),
		bcrypt 					 = require('bcrypt'),
		session 				 = require('express-session'),
		models					 = require('./models'),
    DM               = require('dailymotion-sdk'),
    request          = require('request'),
    Video            = models.videos,
    User             = models.users;
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
// app.use('/videos', videoRouter);
// app.use('/users', userRouter);

app.use(session({
  secret: 'itfollows',
  resave: false,
  saveUninitialized: true
}));

// Routes

// GET videos from DailyMotion
app.get('/videos_search', function(req, res) {
  request({
    uri: 'https://api.dailymotion.com/videos',
    method: 'GET',
    qs: {
      fields: 'audience,bookmarks_total,broadcasting,channel,country,description,duration_formatted,embed_html,end_time,explicit,id,language,metadata_credit_actors,metadata_credit_director,metadata_genre,metadata_original_title,onair,owner,poster_url,recurrence,start_time,status,tags,thumbnail_url,title,url,views_last_day,views_last_hour,views_last_month,views_last_week,views_total',
      flags: 'live_onair',
      sort: 'visited',
      page: 1,
      limit: 100
    }
  }, function(error, response, body) {
    var data = JSON.parse(body).list;
    
    // massage some datas here
    var newData = data.map(function(videoObj) {
      return {
        audience: videoObj.audience,
        bookmarks_total: videoObj.bookmarks_total,
        broadcasting: videoObj.broadcasting,
        channel: videoObj.channel,
        country: videoObj.country,
        title: videoObj.title,
        description: videoObj.description,
        duration_formatted: videoObj.duration_formatted,
        start_time: videoObj.start_time,
        end_time: videoObj.end_time,
        explicit: videoObj.explicit,
        source_video_id: videoObj.id,
        language: videoObj.language,
        metadata_credit_actors: videoObj.metadata_credit_actors,
        metadata_credit_director: videoObj.metadata_credit_director,
        metadata_genre: videoObj.metadata_genre,
        metadata_original_title: videoObj.metadata_original_title,
        onair: videoObj.onair,
        owner: videoObj.owner,
        poster_url: videoObj.poster_url,
        recurrence: videoObj.recurrence,
        status: videoObj.status,
        tags: videoObj.tags,
        thumbnail_url: videoObj.thumbnail_url,
        video_url: videoObj.url,
        views_last_hour: videoObj.views_last_hour,
        views_last_day: videoObj.views_last_day,
        views_last_week: videoObj.views_last_week,
        views_last_month: videoObj.views_last_month,
        views_last_total: videoObj.views_total,
        embed_html: videoObj.embed_html
      }
    });

    Video
      .bulkCreate(newData)
      .then(function(videos) {
        res.send(videos);
      });
  });
});

// GET all videos from videos table
app.get('/videos', function(req, res) {
  Video
    .findAll({
      where: {onair: true}
    })
    .then(function(videos) {
      res.send(videos);
    });
});

// Delete all videos from videos table
app.delete('/videos_delete', function(req, res) {
  Video.destroy({ truncate: true })
    .then(function() {
      res.sendStatus(200);
    });
});

// Create a user account
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

// Update a user account
app.put('/users/:id', function(req, res) {
  User.findone(req.params.id)
      .then(function(user) {
        user.update(req.body)
            .then(function(updatedUser) {
              res.send(updatedUser);
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

app.get('/current_user', function(req, res) {
  var userID = req.session.currentUser;
  User.findOne(userID)
    .then(function(user) {
      res.send(user);
    });
});

// Setting server
app.listen(3000, function() {
	console.log('listening on 3000');
});

// Export app as module
module.exports = app;