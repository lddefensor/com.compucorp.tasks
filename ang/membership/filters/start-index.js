(function(angular, $, _) {
	var app = angular.module('membership');
	app.filter('startIndex', function($filter){
		return function(array, index, sortKey, reverse) { 
	    	var narray = $filter('orderBy')(array, sortKey, reverse); //order first
	    	 
	        if(narray && narray.slice) 
	        {
	            index = +index; //parse to int
	            return narray.slice(index);
	        }
	        
	        return [];
	    };
	});
})(angular, CRM.$, CRM._);