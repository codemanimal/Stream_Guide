var App = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {}
};

$(function() {
	console.log('loaded, bro');

	App.videos = new App.Collections.Videos;
	App.videosView = new App.Views.Videos({ collection: App.videos });
	App.loginModal = new App.Views.LoginModal();

	App.videos.fetch({ reset: true });

});