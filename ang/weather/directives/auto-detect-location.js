(function(angular, $, _) {

 /** 
  * Reads location using navigator
  */
	
	var detectLocationModule = angular.module('autoDetectLocation', []);
	detectLocationModule.directive('autoDetectLocation', function(){
		return {
			restrict: 'E',
			templateUrl: '~/weather/directives/html/auto-detect-location.html',
			controller: function($scope, $timeout){
				 
				$scope.locationDetected = false; 
				$scope.position = null;
				$scope.errorMessage = null;
				
				$scope.getLocation = function(){
					navigator.geolocation.getCurrentPosition(function(position){ 
						var lat = Math.round(position.coords.latitude*100)/100;
						var lng = Math.round(position.coords.longitude*100)/100;
						$scope.position = {lat: lat, lng: lng};
						
						$timeout(function(){
							$scope.locationDetected = true;
						}, 500);  
						$scope.errorMessage = null;
						
					},function(e){  
						
						$timeout(function(){
							$scope.locationDetected = false;
						}, 500);
						
						var errorMessage = e.code == 1 ? 'Provide location' : e.message;  
						$scope.errorMessage = errorMessage;
						$scope.position = null;
					});  
				};
				
				//check for changes in properties
				$scope.$watch('launched', function(){
					console.log("Toggle launched to :" + $scope.launched.toString()); 
					if($scope.launched)
					{
						$scope.getLocation();
					}
					else
					{
						$scope.position = null;
					}
				});  
			}
		};
	});
	 
		 
})(angular, CRM.$, CRM._);
