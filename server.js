var application_root = __dirname,
		express					 = require('express'),
		bodyParser			 = require('body-parser'),
		path						 = require('path'),
		logger					 = require('morgan'),
		videoRouter 		 = require('./routers/video_router.js');

var app = express();
require('dotenv').load();

// Server Configuration
if (process.env.NODE_ENV !== "test") {
	app.use( logger('dev') );
}
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );
app.use( express.static(path.join(application_root, 'public')) );
app.use( express.static(path.join(application_root, 'browser')) );
app.use('/videos', videoRouter);

app.listen(3000, function() {
	console.log('listening on 3000');
});

// Export app as module
module.exports = app;