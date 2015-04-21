App.Collections.Videos = Backbone.Collection.extend({
	url: 'videos',
	model: App.Models.Video,

	initialize: function() {
		console.log('Video collection made');
		// When collection is synced, start livestream video
		this.on('sync', this.playVideo, this);
	},

	playVideo: function() {
		$('#video-player').append(this.models[0].attributes.embed_html);
	}

});