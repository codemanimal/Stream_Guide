App.Views.CreateUser = Backbone.View.extend({
	el: '#login-modal',

	initialize: function() {
		console.log('sign-up modal created');
		this.render();
	},

	render: function() {
		this.$el.html($('#sign-up-modal').html());
	},

	events: {
		'click #sign-up-button'			 : 'signup',
		'click #back-to-login-button': 'goBack',
		'click #login-button'			 	 : 'login'

	},

	signup: function() {
		var name = $('#signup-name').val();
		var email = $('#signup-email').val();
		var birthdate = $('#signup-birthdate').val();
		var city = $('#signup-city').val();
		var state = $('#signup-state').val();
		var username = $('#signup-username').val();
		var password = $('#signup-password').val();

		$.post('/users', {
			username: username,
			password: password,
			name: name,
			email: email,
			birthdate: birthdate,
			city: city,
			state: state
		}).done();

		this.$el.empty();
		this.$el.append($('#welcome-modal-template').html());
	},

	goBack: function() {
		this.$el.empty();
		new App.Views.LoginModal();
	},

	login: function() {
		// Start the session
		var username = $('#login-username').val();
		var password = $('#login-password').val();
		$.post('/sessions', {
			username: username,
			password: password
		})
		.done(this.fetchAndRenderSession)

		// Empty the inputs
		var username = $('#login-username').val('');
		var password = $('#login-password').val('');
	},

	fetchAndRenderSession: function() {
		$.get('current_user').done(function(user) {
			if (user) {
				$('#login-modal').hide();
				alert('Welcome, ' + user.username + '!');
			}
		});
	}


});