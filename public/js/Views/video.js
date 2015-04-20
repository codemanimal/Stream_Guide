App.Views.Video = Backbone.View.extend({
	initialize: function() {
		console.log('Video view created');
		// Compile the template for a single video view
		this.template = Handlebars.compile($('#video-preview-template').html());
		// Render the single video view onto the page
		this.render();
	},

	render: function() {
		// Set the html of the undefined view element to the template with the data from the model
		this.$el.html( this.template( this.model.toJSON() ) );
	}

});