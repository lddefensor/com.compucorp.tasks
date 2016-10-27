(function(angular, $, _) {
	var app = angular.module('membership');
	
	app.directive('grid', function(){
		return {
			restrict: 'AE',
			templateUrl: '~/membership/directives/html/grid.html' 
		};
	});
	
})(angular, CRM.$, CRM._);