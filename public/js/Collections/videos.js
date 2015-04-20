App.Collections.Videos = Backbone.Collection.extend({
	url: 'videos',
	model: App.Models.Video,

	initialize: function() {
		console.log('Video collection made');
		// this.getVideos();
	},

	// // Get videos from my database
	// getVideos: function() {
	// 	$.get('/videos');
	// }

});