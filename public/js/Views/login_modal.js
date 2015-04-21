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
		'click #login-button'			 : 'login',
		'click #create-user-button': 'createUser'
	},

	login: function() {
		// Hide the view
		// this.$el.empty();
		// Start the session
		var username = $('#login-username').val();
		var password = $('#login-password').val();

		$.post('/sessions', {
			username: username,
			password: password
		}).done(this.fetchAndRenderSession)
			.fail(function(response) {
				var err = response.responseJSON;
				alert(err.err + ' - ' + err.msg);
			});

		// Empty the inputs
		var username = $('#login-username').val('');
		var password = $('#login-password').val('');
	},

	createUser: function() {
		this.$el.empty();
		new App.Views.CreateUser;
	},

	fetchAndRenderSession: function() {
		$.get('current_user').done(function(user) {
			console.log('Welcome, ' + user.username);
			this.$el.empty();
		});
	}

});