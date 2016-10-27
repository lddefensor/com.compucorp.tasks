(function(angular, $, _) {


	/** create helper methods **/
	Object.toArray = function(object)
	{
		return Object.keys(object).map(function(n){ return object[n];});
	};
	
	var toDateString = function(str)
	{
		var date = new Date(str);
  		date = date.toDateString().substr(4, date.lenth);
  		var parts = date.split(" "); 
  		return parts[0] + ' ' + parts[1] + ', ' + parts[2];
	};
	// helper methods for grid ui;
	
	 
	 var app = angular.module('membership');
	 
	 app.controller('MembershipController', ['$scope', 'crmApi', 'Pagination', function($scope, crmApi, Pagination){
	 	console.log('task 2');
	 	
	 	//for GRID UI
	 	$scope.fields = [
	 		{name: 'contact_name', label: 'Name', mapping: {data: 'contacts', fkey: 'contact_id', display_name: 'display_name', scope: $scope} },
	 		{name: 'membership_type', label: 'Type', mapping: {data: 'membershipTypes', fkey: 'membership_type_id', display_name: 'name', scope: $scope}},
	 		{name: 'join_date', label: 'Member Since', transform: toDateString},
	 		{name: 'start_date', label: 'Start Date', transform: toDateString},
	 		{name: 'end_date', label: 'End Date', transform: toDateString},
	 		{name: 'source', label: 'Source'},
	 		{name: 'membership_status', label: 'Status', mapping: {data: 'membershipStatuses', fkey: 'status_id', display_name: 'name', scope: $scope}},
	 	];
	 	
	 	$scope.searchText = '';
	  	$scope.sortKey = '';
	  	$scope.reverse = false;
	 	$scope.paginationState = {
	 		current: 1,
			count: 0,
			numItems: 10,
			pages: 0,
			searchText: '',
			pageLink: 5,
			startIndex: 0
		};
		/*
		 * called when one of page links are clicked
		 */
		
		/*
		 * called when one of table headers are clicked
		 */
		$scope.sort = function(field)
		{
			if(field == $scope.sortKey)
				$scope.reverse = !$scope.reverse;
			else $scope.reverse = false;
			
			$scope.sortKey = field; 
		};
	 	
	 	//DATA
	 	$scope.data = null; 
	 	$scope.contacts = null; 
	 	$scope.membershipTypes = null; 
	 	$scope.membershipStatuses = null;  
	 	
	 	var options =  {options: {limit: 0}};
	 	
	 	//get memberships first
	 	crmApi('membership', 'get', {
	 		options: {
	 			limit: 0, 
	 			offset: 0, 
	 		}
	 	}).then(function(r){
	 		$scope.data = Object.toArray(r.values);
	 		$scope.paginationState.count =  $scope.data.length; 
			$scope.paginationState = Pagination.updatePaginationState($scope.paginationState); 
  	 	});
	 	
	 	//get others
	 	crmApi('contact', 'get', options).then(function(r){
	  		$scope.contacts =  r.values;
	  	}); 
	 	crmApi('membershipType', 'get', options).then(function(r){
	  		$scope.membershipTypes =  r.values;
	  	}); 
	 	crmApi('membershipStatus', 'get', options).then(function(r){
	  		$scope.membershipStatuses =  r.values;
	  	});   
	  	  
	  	  $scope.startDate = null;
	  	  $scope.endDate = null;
	  	 
	  	 $scope.onChange_start_date = function(date, start, end)
	  	 {	
	  	 	//changes in start_date
	  	 	if(date)
	  	 	{
	  	 		$scope.starDate = date;
	  	 	}
	  	 	else if(start || end)
	  	 	{
	  	 		$scope.starDate = [start, end]; 
	  	 	}
	  	 	else
	  	 	{
	  	 		$scope.starDate = null;
	  	 	}
	  	 };
	  	 $scope.onChange_end_date = function(date, start, end)
	  	 {
	  	 	//changes in end_date
	  	 	if(date)
	  	 	{
	  	 		$scope.endDate = date;
	  	 	}
	  	 	else if(start || end)
	  	 	{
	  	 		$scope.endDate = [start, end]; 
	  	 	}
	  	 	else
	  	 	{
	  	 		$scope.endDate = null;
	  	 	}
	  	 	$scope.$apply();
	  	 };
	  	 
	 }]);
	 
	  
	 
})(angular, CRM.$, CRM._);