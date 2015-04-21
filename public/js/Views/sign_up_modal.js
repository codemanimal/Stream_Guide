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

		this.$el.empty();
		this.$el.append($('#welcome-modal').html());

		// var welcomeView = this;
		
		// var clearWindow = function(welcomeView) {
		// 	setTimeout(function(welcomeView) {
		// 	debugger;
		// 		welcomeView.$el.empty().bind(this);
		// 	}, 1000);
		// };
		// clearWindow(welcomeView);
	}

});