App.Views.Videos = Backbone.View.extend({

	el: '#video-list',

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
		this.$el.append(new App.Views.Video({ model: video }).$el);
	}
});