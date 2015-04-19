var express = require('express'),
		models	= require('../models'),
		Video 	= models.videos;

var videoRouter = express.Router();

module.exports = videoRouter;