//Adding directives for the module
function addDirectives(app) {
	app.directive('ngRightClick', function($parse) {
	    return function(scope, element, attrs) {
	        var fn = $parse(attrs.ngRightClick);
	        element.bind('contextmenu', function(event) {
	            scope.$apply(function() {
	                event.preventDefault();
	                fn(scope, {$event:event});
	            });
	        });
	    };
	});
	//Directive for autofocus elements 
	app.directive('autoFocus', function($timeout) {
	    return {
	        restrict: 'AC',
	        link: function(_scope, _element) {
	            $timeout(function(){
	                _element[0].focus();
	            }, 0);
	        }
	    };
	});
}
