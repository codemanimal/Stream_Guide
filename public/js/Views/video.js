App.Views.Video = Backbone.View.extend({
	initialize: function() {
		console.log('Video view created');
		// Compile the template for a single video view
		this.template = Handlebars.compile($('#video-preview-template').html());
		// Render the single video view onto the page
		this.render();
	},

	render: function() {
		// Append the template to the '#video-list' table
		this.$el.html( this.template( this.model.toJSON() ) );
	},

	events: {
		'click #watch-link' 		 : 'watchVideo',
		'click #description-link': 'showInfo'
	},

	watchVideo: function() {
		$('#video-player').empty();
		$('#video-player').append(this.model.attributes.embed_html);
	},

	showInfo: function() {
		App.loginModal.$el.empty();
		App.loginModal.$el.html($('<p>').html(this.model.attributes.description));
		App.loginModal.$el.show();
		$('#login-modal').on('click', function() {
			App.loginModal.$el.hide();
		});
	}
});