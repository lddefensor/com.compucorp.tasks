(function(angular, $, _) {

 /**  
  * If the user denies to share the location, show a little input form for entering postcode or country, 
  * and display the weather based on that location. 
  */
	
	var getLocation = angular.module('getLocation', []);
	getLocation.directive('getLocation', function(){
		return {
			restrict: 'E',
			templateUrl: '~/weather/directives/html/get-location.html',
			controller: function($scope, $http){
				console.log('manually check location');   
				$scope.errorMessage = null; 
				$scope.countries = countries; 
			},
			link: function(scope, element, attributes)
			{
				var select = element.find('select');
				
				$(select).select2({
					placeholder: 'Select Country' 
				});
				
				$(select).on('change', function(evt){
					scope.countrycode = evt.target.value;
					scope.$apply();
				});
			}
		};
	});
	 
		 
})(angular, CRM.$, CRM._);
