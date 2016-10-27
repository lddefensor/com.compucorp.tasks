(function(angular, $, _) {
	var app = angular.module('membership');
	
	app.directive('datepicker', function(){
		return {
			restrict: 'AE', 
			require: 'ngModel',
			replace: true,
			link: function(scope, element, attributes, ngModel)
			{
				
				var date_format = 'mm/dd/yy'; 
				 $(element).datepicker({
			        closeAtTop: true,
			        dateFormat: date_format,
			        changeMonth: (date_format.indexOf('m') > -1),
			        changeYear: (date_format.indexOf('y') > -1),
			        altField: $(element)
			      });  
			}
		};
	});
	
})(angular, CRM.$, CRM._);