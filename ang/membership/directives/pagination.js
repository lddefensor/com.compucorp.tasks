(function(angular, $, _) {
	var app = angular.module('membership');
	
	//directives for pagination
	app.directive('pagination', function(){
	 	return {
	 		restrict: 'AE',
	 		templateUrl: '~/membership/directives/html/pagination.html',
	 		scope: {
	 			paginationState: '=paginationState'
	 		},
	 		controller: ['$scope', 'Pagination', function($scope, Pagination){
	 			$scope.gotoPage = function($event, page)
				{
					switch(page)
					{
						case 'first': page = 1;	break;
						case 'last': page = $scope.paginationState.pages;	break;
						case 'prev': page = $scope.paginationState.current - 1; break;
						case 'next': page = $scope.paginationState.current + 1; break;
					} 
					
					$scope.paginationState.current = page;	
					
					$scope.paginationState.startIndex = (page - 1) * $scope.paginationState.numItems;
					
					Pagination.updatePaginationRange($scope.paginationState);
				};
	 		}]
	 	};
	 });
	
})(angular, CRM.$, CRM._);