App.Views.Videos = Backbone.View.extend({
	el: '#video-list',

	initialize: function() {
		console.log('Videos view created');
		// When a new view is created - render
		this.render();
	},

	render: function() {
		// Take each model in the collection and render one by one
		this.collection.each(this.renderOne, this);
	},

	renderOne: function(video) {
		// Create a single video view
		var videoView = new App.Views.Video({ model: video });
		// Append the single video view to the container of this element
		this.$el.append(videoView.$el);
	}

});