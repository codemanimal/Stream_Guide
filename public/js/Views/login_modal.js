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
		'click #login-button'			 		 : 'login',
		'click #create-user-button'		 : 'createUser',
		'click #cancel'						 		 : 'cancel',
		'click #update-finalize-button': 'update'
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

	createUser: function() {
		this.$el.empty();
		new App.Views.CreateUser;
	},

	fetchAndRenderSession: function() {
		$.get('current_user').done(function(user) {
			if (user) {
				$('#login-modal').hide();
				alert('Welcome, ' + user.username + '!');
			} else {
				alert('That user does not exist');
				this.render();
			}
		});
	},

	cancel: function() {
		console.log('button clicked');
		this.$el.hide();
	},

	update: function() {
		console.log('button clicked');
		$.get('current_user').done(function(user) {
			if (user) {

				var userID = user.id;
				var name = $('#update-name').val();
				var email = $('#update-email').val();
				var birthdate = $('#update-birthdate').val();
				var city = $('#update-city').val();
				var state = $('#update-state');
				var username = $('#update-username').val();
				var password = $('#update-password').val();

				if (name === '') {
					var name = user.name;
				}
				if (email === '') {
					var email = user.email;
				}
				if (birthdate === '') {
					var birthdate = user.birthdate;
				}
				if (city === '') {
					var city = user.city;
				}
				if (state === '') {
					var state = user.state;
				}
				if (username === '') {
					var username = user.username;
				}
				if (password === '') {
					var password = user.password_digest;
				}

				$.ajax({
					url: '/users/' + userID,
					method: 'PUT',
					data: {
						name: name,
						email: email,
						birthdate: birthdate,
						city: city,
						state: state,
						username: username,
						password: password
					}
				}).done(this.updatedAccount);
			}
		});
	},

	updatedAccount: function() {
		debugger;
		this.$el.empty();
		this.$el.append($('#update-modal').html());		
	}

});