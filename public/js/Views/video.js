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
	},

	events: {
		'click #save-button' : 'saveVideo'
	},

	saveVideo: function() {
		// Get id of the video
		var videoID = this.model.get('id');
		debugger;
		// var currentUser = 
		// Send PUT request to add video to users session
		$.ajax({
			url: '',
			method: 'PUT',
			data: {
				video_id: videoID
			}
		}).done();
		this.removeButton();
	},

	removeButton: function() {
		// Remove button and replace with 'Saved!'
		$('#save-button').remove();
		this.$el.append($('<span>').html('Saved!'));	
	}

});