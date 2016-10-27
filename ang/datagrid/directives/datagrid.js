(function(angular, $, _) {

 /** 
  * Datagrid JS
  */
	
	var datagridModule = angular.module('datagrid', []);
	datagridModule.directive('datagrid', function(){
		return {
			restrict: 'E',
			scope: {
				fields: '=fields',
			},
			templateUrl: '~/datagrid/directives/html/datagrid.html',
			controller: function($scope, $http){
				console.log('datagrid');  
				
			}
		};
	});
	 
		 
})(angular, CRM.$, CRM._);
