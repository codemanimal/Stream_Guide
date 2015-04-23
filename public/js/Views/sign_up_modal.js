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
		'click #sign-up-button': 'signup'
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

		// Start session after user is created
		// $.post('/sessions', {
		// 	username: username,
		// 	password: password
		// })
		// .done(console.log('session started'));

		this.$el.empty();
		this.$el.append($('#welcome-modal').html());
		this.$el.on('click', function() {
			console.log('clicked');
			this.remove();
		});
	}

});