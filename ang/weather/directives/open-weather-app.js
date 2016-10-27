(function(angular, $, _) {

 /**  
  * 
  * Use the http://openweathermap.org/current public API to fetch the weather for that location and displays it.  
  */
	
	var openWeatherModule = angular.module('openWeatherApp', []);
	
	openWeatherModule.constant('API_KEY', 'cc27de5d252db090eb2c10a397222f6a');
	
	openWeatherModule.directive('openWeatherApp', function(){
		return {
			restrict: 'E',
			templateUrl: '~/weather/directives/html/open-weather-app.html',
			controller: ['$scope', '$http', '$timeout', 'API_KEY', function($scope, $http, $timeout, API_KEY){
				console.log('open weather app');    
				$scope.weather = null;
				
				$scope.getWeatherFromPosition = function(){
					if(!$scope.position)
					{
						$scope.weather = null;
						$scope.w = null;
						return;
					}
				
					var lat = $scope.position.lat;
					var lng = $scope.position.lng;
				
					var url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&APPID='+API_KEY+'&units=metric' ;
					var data = {};
					 
					$http.post(url,data, {
						 headers : {
					        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
					    }
					}).success(function(result){
						$scope.weather = result;
						$scope.w = result.weather[0];
						
					});
				};
				 
				//watch position property
				$scope.$watch('position', function(){
					if($scope.position) $scope.getWeatherFromPosition(); 
					else
					{
						if(!$scope.postalcode && !$scope.countrycode)
						{
							$scope.weather = null;
							$scope.w = null;
						}
					}
				}); 
				$scope.getWeatherFromPostalCode = function(){
					if(!$scope.countrycode || !$scope.postalcode) {
						$scope.weather = null;
						return;
					}
					$scope.locationDetected = true;
					var url = 'http://api.openweathermap.org/data/2.5/weather?zip='+$scope.postalcode+','+$scope.countrycode+'&APPID='+API_KEY+'&units=metric' ;;
					var data = {};
					 
					$http.post(url,data, {
						 headers : {
					        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
					    }
					}).success(function(result){
						$scope.weather = result;
						$scope.w = result.weather[0]; 
					});
				}; 
				
				$scope.myTimeout = null;
				$scope.$watchGroup(['postalcode', 'countrycode'], function(){
					
					//create a timeout first
					 $timeout.cancel($scope.myTimeout);  
					
					$scope.myTimeout = $timeout(function(){
						if(!$scope.postalcode || !$scope.countrycode)
						{
							if(!$scope.position)
							{
								$scope.weather = null;
								$scope.w = null;
							}
						}
						else
						{
							$scope.getWeatherFromPostalCode();
						}	
					}, 500);
					
					
				
					
				}); 
				
			}]
		};
	});
	 
		 
})(angular, CRM.$, CRM._);
