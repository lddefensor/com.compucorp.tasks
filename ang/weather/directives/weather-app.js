(function(angular, $, _) {

 /** 
  * Build a simple HTML/JS app preferably based on AngularJS v1 which, when you open the site, asks for a permission to read your current location, 
  * and then uses the http://openweathermap.org/current public API to fetch the weather for that location and displays it. 
  * If the user denies to share the location, show a little input form for entering postcode or country, 
  * and display the weather based on that location. 
  */
	
	var weatherModule = angular.module('weatherApp', ['autoDetectLocation', 'openWeatherApp', 'getLocation']);
	weatherModule.directive('weatherApp', function(){
		return {
			restrict: 'E',
			templateUrl: '~/weather/directives/html/weather-app.html',
			controller: function($scope, $http){
				console.log('weather app'); 
				
				$scope.launched = false; 
				
				$scope.toggleLaunched = function(){  
					$scope.launched = !$scope.launched; 
				};  
				
				
			}
		};
	});
	 
		 
})(angular, CRM.$, CRM._);
