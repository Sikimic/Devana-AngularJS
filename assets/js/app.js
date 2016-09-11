//App module
(function() {
	var app = angular.module("FileSystem", ['ui.bootstrap.contextMenu']);
	addControllers(app);
	addDirectives(app);
	addServices(app);
})();
