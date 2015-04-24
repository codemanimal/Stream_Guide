App.Models.Video = Backbone.Model.extend({
	urlRoot: '/videos',

	initialize: function() {
		console.log('Video model created');
	}
});