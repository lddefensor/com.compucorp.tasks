(function(angular, $, _) {
	var app = angular.module('membership');
	
	Date.prototype.sameDate = function(date)
	{
		return this.getFullYear() == date.getFullYear() && this.getMonth() == date.getMonth() && date.getDate() == this.getDate();
	};
	app.filter('filterStartEndDate', function($filter) {   
   		return function(array, startDate, endDate){
   			if(!startDate && !endDate) return array; // INVALID arguments
   			
   			//check if startDate, endDate is array or string 
   			
	    	var sd, ed;
	    	if(startDate) 
	    	{
	    		if(Array.isArray(startDate))
	    		{
	    			sd = [];
	    			sd[0] = startDate[0] ? new Date(startDate[0]) : null;
	    			sd[1] = startDate[1] ? new Date(startDate[1]) : null;
	    		}
	    		else sd = new Date(startDate);
	    	} 
	    	if(endDate) 
	    	{
	    		if(Array.isArray(endDate))
	    		{
	    			ed = [];
	    			ed[0] = endDate[0] ? new Date(endDate[0]) : null;
	    			ed[1] = endDate[1] ? new Date(endDate[1]) : null;
	    		}
	    		else ed = new Date(endDate);
	    	}
	    	
	    	var dateIncluded = function(compare, data){
	    		var included = false;
            	if(Array.isArray(data))
            	{
            		if(data[0] && data[1]) included = compare >= data[0] && compare <= data[1]; 
            		else if (data[0]) included = compare >= data[0];
            		else if (data[1]) included = compare <= data[1];
            	}
            	else included = compare.sameDate(data); 
            	
            	return included;
	    	};

			var result = []; 
			for (var i=0; i<array.length; i++){
	            var sd2 = new Date(array[i].start_date),  ed2 = new Date(array[i].end_date);
	            
	            var sdIncluded = false;
	            var edIncluded = false;
	            if(sd && ed) //both dates are given
	            {
	            	sdIncluded = dateIncluded(sd2, sd); 
	            	edIncluded = dateIncluded(ed2, ed);  
	            	
	            	if(sdIncluded && edIncluded) result.push(array[i]); 
	            }
	            else
	            {
	            	//just start date // 
	            	if(sd)
	            	{
	            		if(dateIncluded(sd2, sd)) result.push(array[i]);
	            	}
	            	else if(ed)
	            	{
	            		if(dateIncluded(ed2, ed)) result.push(array[i]);
	            	} 
	            } 
	        }    
	                
	        return result; 
   		};
	});
})(angular, CRM.$, CRM._);