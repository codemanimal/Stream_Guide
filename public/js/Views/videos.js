App.Views.Videos = Backbone.View.extend({
	initialize: function() {
		console.log('Videos view created');
		// When new view is created and video data fetched from database - render
		this.listenTo(this.collection, 'sync', this.render);
	},

	render: function() {
		// Take each model in the collection and render one by one
		this.collection.each(this.renderOne, this);
	},

	renderOne: function(video) {
		// Create a single video view
		var videoView = new App.Views.Video({ model: video });
	}

});