// var express = require('express'),
// 		models	= require('../models'),
// 		Video 	= models.videos;

// var videoRouter = express.Router();

// // var videoRoute = 'https://api.dailymotion.com/videos?fields=audience,bookmarks_total,broadcasting,channel,country,description,duration_formatted,end_time,explicit,id,language,metadata_credit_actors,metadata_credit_director,metadata_genre,metadata_original_title,onair,owner,poster_url,recurrence,start_time,status,tags,thumbnail_url,title,url,views_last_day,views_last_hour,views_last_month,views_last_week,views_total,&flags=featured,live_onair,no_premium&sort=recent';

// // GET ALL VIDEOS 
// videoRouter.get('/videos', function(req, res) {
	
// 	request({
// 		uri: 'http://api.giphy.com/v1/gifs/random',
// 		method: 'GET',
// 		qs: {
// 			api_key: 'dc6zaTOxFJmzC'
// 		},
// 		json: true
// 	}, function(error, response, body) {
// 		var results = body.data;
// 		res.send(results);
// 	});
// });

// module.exports = videoRouter;