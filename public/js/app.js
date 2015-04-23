var App = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {}
};

$(function() {
	console.log('loaded, bro');

	$.ajax({
		url: '/videos_delete',
	 	method: 'DELETE'	
	}).then(function() {
		$.get('/videos_search')
		 .done(function() {
			 App.videos.fetch({ reset: true });
		 });
	});

	App.videos = new App.Collections.Videos;
	App.videosView = new App.Views.Videos({ collection: App.videos });
	App.loginModal = new App.Views.LoginModal();

	$('#logout').on('click', logout);
	$('#about-footer').on('click', renderAbout);
	$('#feedback-footer').on('click', renderFeedback);
	$('#terms-footer').on('click', renderTerms);
	$('#account').on('click', renderAccount);

});

// Functions for non-view related elements
var logout = function() {
	$.get('current_user').done(function(user) {
		if (user) {
		  $.ajax({
  			url: '/sessions',
 				method: 'DELETE',
			}).done(console.log('session deleted'));
			alert('Goodbye!');
			App.loginModal.$el.show();
		} else {
			console.log('button clicked with no session');
		}
	});
};

var renderAbout = function() {
	$.get('current_user').done(function(user) {
			if (user) {
				App.loginModal.$el.empty();
				App.loginModal.$el.append($('#about').html());
				App.loginModal.$el.show();
				$('.back').on('click', function() {
					App.loginModal.$el.hide();
				});
			}
		});
};

var renderFeedback = function() {
	$.get('current_user').done(function(user) {
		if (user) {
			App.loginModal.$el.empty();
			App.loginModal.$el.append($('#feedback').html());
			App.loginModal.$el.show();
			$('.back').on('click', function() {
				App.loginModal.$el.hide();
			});
		}
	});
};

var renderTerms = function() {
	$.get('current_user').done(function(user) {
		if (user) {
			App.loginModal.$el.empty();
			App.loginModal.$el.append($('#terms').html());
			App.loginModal.$el.show();
			$('.back').on('click', function() {
				App.loginModal.$el.hide();
			});
		}
	});
};

var renderAccount = function() {
	$.get('current_user').done(function(user) {
		if(user) {
			console.log('clicked');
			this.template = Handlebars.compile($('#account-modal').html());
			var accountView = new App.Views.CreateUser();
			accountView.$el.empty();
			accountView.$el.append(this.template(user));
			accountView.$el.show();
			$('.back').on('click', function() {
				App.loginModal.$el.hide();
			});
			$('#update-account-button').on('click', function() {
				console.log('button clicked');
				var updateView = new App.Views.CreateUser();
				updateView.$el.empty();
				updateView.$el.append($('#update-modal').html());
				updateView.$el.show();
			});
		}
	});
};