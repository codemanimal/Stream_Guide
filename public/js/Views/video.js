App.Views.Video = Backbone.View.extend({
	el: '#video-list',

	initialize: function() {
		console.log('Video view created');
		// Compile the template for a single video view
		this.template = Handlebars.compile($('#video-preview-template').html());
		// Render the single video view onto the page
		this.render();
	},

	render: function() {
		// Append the template to the '#video-list' table
		this.$el.append( this.template( this.model.toJSON() ) );
	}

	// events: {
	// 	'click #watch-link' : 'watchVideo'
	// },

	// watchVideo: function() {
	// 	$('#watch-link').attr('href', this.model.attributes.video_url)
	// 	debugger;
	// 	// Get id of the video
	// 	var videoID = this.model.get('id');
	// 	// var currentUser = 
	// 	// Send PUT request to add video to users session
	// 	$.ajax({
	// 		url: '/video/' + userID + '/add_video',
	// 		method: 'PUT',
	// 		data: {
	// 			video_id: videoID
	// 		}
	// 	}).done(this.removeButton());
	// },

	// removeButton: function() {
	// 	// Remove button and replace with 'Saved!'
	// 	$('#save-button').remove();
	// 	this.$el.append($('<span>').html('Saved!'));	
	// }

});