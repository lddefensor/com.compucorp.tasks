(function(angular, $, _) {
  // Declare a list of dependencies.
  var app = angular.module('weather', [
    'crmUi', 'crmUtil', 'ngRoute', 'autoDetectLocation', 'openWeatherApp', 'getLocation'
  ]);   
  
   app.config(function($routeProvider) { 
	 $routeProvider.when('/weather', { 
	 	controller: function($scope){
			console.log('weather app'); 
			
			$scope.launched = true; 
			
			$scope.toggleLaunched = function(){  
				$scope.launched = !$scope.launched; 
			};   
		},
        templateUrl: '~/weather/weather.html', 
      });
	});
})(angular, CRM.$, CRM._);
