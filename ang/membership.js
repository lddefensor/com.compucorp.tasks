(function(angular, $, _) {
  // Declare a list of dependencies.
	var app = angular.module('membership', [
		'crmUi', 'crmUtil', 'ngRoute' 
	]);   
	app.config(function($routeProvider) { 
		$routeProvider.when('/membership', { 
			controller: 'MembershipController',
			templateUrl: '~/membership/membership.html',
		});
	});
})(angular, CRM.$, CRM._);
