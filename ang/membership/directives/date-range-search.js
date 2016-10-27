(function(angular, $, _) {
	var app = angular.module('membership');
	
	var formatDate = function(date){
		if(! date) return 'Invalid Date';
		
		if(  typeof (date.getFullYear) == 'function' ); 
			return (date.getMonth() + 1)+ '/' + date.getDate() + '/'+ date.getFullYear();
		
		return 'Invalid Date';
	};
	
	app.directive('dateRangeSearch', function(){
	 	return {
	 		restrict: 'AE', 
	 		templateUrl: '~/membership/directives/html/date-range-search.html',
	 		scope: {
	 			form: '=form',
	 			model: '=model',
	 		},
	 		controller: ['$scope', 'crmApi', 'RelativeDate', function($scope, crmApi, RelativeDate){
	 			$scope.dateValue = ''; 
	 			
	 			//hidden fields
	 			$scope.dateRangeStart = '';
	 			$scope.dateRangeEnd = ''; 
	 			
	 			 //fetch list of available relative dates
				crmApi('Tasks', 'get_relative_dates').then(function(r){
			 		$scope.relativeDates = r;
			 		
			 		r.forEach(function(relDate){
			 			var key = relDate.key;
			 			var label = relDate.label;  
		  	 	});
		  	 	
		  	 	$scope.$watch('dateValue', function(newValue, oldValue){
		  	 		if(newValue != oldValue)
		  	 		{
		  	 			var date = RelativeDate.getRangeDates(newValue);
		  	 			if(date == false)
			 			{
			 				$scope.dateValue = '';
			 				$scope.date = null;
			 				$scope.dateRangeStart = null;
			 				$scope.dateRangeEnd = null;
			 				$scope.model =  null;
			 			}
			 			else if(Array.isArray(date))
			 			{
			 				$scope.dateRangeStart = date[0] ? formatDate(date[0]) : null;
			 				$scope.dateRangeEnd = date[1] ? formatDate(date[1]) : null;
			 				$scope.date = null;
			 				$scope.model =  [$scope.dateRangeStart, $scope.dateRangeEnd];
			 			}
			 			else  
			 			{
			 				$scope.date = formatDate(date);
			 				$scope.dateRangeStart = null;
			 				$scope.dateRangeEnd = null;
			 				$scope.model =  $scope.date;
			 			}
			 			
			 			//$scope.$parent['onChange_'+$scope.form.name].call($scope.$parent, $scope.date, $scope.dateRangeStart, $scope.dateRangeEnd);
			 			
			 		}
			 		
			 	}); 
		  	 });	 
	 		}], 
	 		link: function(scope, element, attributes){
	 			var select = element.find('select');
	 			scope.initialized = false;
	 			var createSelect2 = function(){
	 				if(scope.initialized) return;
	 				$(select).select2({
	 					placeholder: scope.form.placeholder,
	 					allowClear: true
	 				});
	 				scope.initialized = true;
	 			};
	 			
	 			if(scope.relativeDates)
	 			{
	 				createSelect2();
	 			}
	 			else
	 			{
	 				scope.$watch('relativeDates', function(){
	 					createSelect2();
	 				});
	 			}
	 			
	 			$(select).on('change', function(event){ 
	 				scope.dateValue = event.val;
	 				scope.$apply();
	 			});
	 			
	 		}
	 	};
	 });
})(angular, CRM.$, CRM._);