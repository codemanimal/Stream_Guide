App.Views.LoginModal = Backbone.View.extend({
	el: '#login-modal',

	initialize: function() {
		console.log('login modal created');
		this.render();
	},

	render: function() {
		this.$el.append($('#login-modal-template').html());
		this.$el.show();
	},

	events: {
		'click #login-button'			 : 'startSession',
		'click #create-user-button': 'createUser'
	},

	startSession: function() {
		// Hide the view
		this.$el.empty();
		// Start the session
	},

	createUser: function() {
		this.$el.empty();
		new App.Views.CreateUser;
	}


});