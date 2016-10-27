(function(angular, $, _) {
	var app = angular.module('membership');
	
	Number.prototype.padLeft = function(n, str){
		str = str || '0';
		
		return Array(n-String(this).length+1).join(str);
		
	}; 
	
	
	Date.prototype.getStartOfWeek = function()
	{
		var date = new Date(this);
		var d = date.getDate() - date.getDay(); 
		date.setDate(d);
		
		return date;
	};
	
	Date.prototype.getEndOfWeek = function()
	{
		var date = new Date( this.getStartOfWeek() );
		date.setDate(date.getDate() + 6);  
		return date;
	};
	Date.prototype.getStartOfMonth = function()
	{
		var date = new Date(this);
		date.setDate(1);  
		return date;
	};
	Date.prototype.getEndOfMonth = function()
	{
		var date = this.addMonths(1).getStartOfMonth().addDays(-1); 
		return date;
	};
	Date.prototype.getStartOfYear = function()
	{
		var date = new Date(this);
		date.setMonth(0);
		date.setDate(1);
		return date;
	};
	Date.prototype.getEndOfYear = function()
	{
		var date = this.addYears(1).getStartOfYear().addDays(-1); 
		return date;
	};
	Date.prototype.getQuarter = function(){
	 	return  Math.floor((this.getMonth() + 3 )/3);
	};
	Date.prototype.getStartOfQuarter = function(){
	 	var date = new Date(this);
	 	var quarter = this.getQuarter();
	 	var startOfQuarter = (quarter - 1)*3;
	 	
	 	date.setDate(1);
	 	date.setMonth(startOfQuarter);
	 	return date;
	}; 
	Date.prototype.getEndOfQuarter = function(){
	 	var date = this.getStartOfQuarter().addMonths(3).addDays(-1); 
	 	return date;
	}; 
	
	Date.prototype.addDays = function(days){
		var date = new Date(this);
		date.setDate(this.getDate() + days);
		
		return date;
	};
	
	Date.prototype.addMonths = function(months){
		var date = new Date(this);
		date.setMonth(date.getMonth() + months);
		
		return date;
	};
	
	Date.prototype.addYears = function(years){
		var date = new Date(this);
		date.setFullYear(date.getFullYear() + years);
		
		return date;
	};
	
	app.factory('RelativeDate', function(){
		return {   
			 getRangeDates: function(str){ 
			 	var today = new Date();
			 	var singleDate = null; //is equal
			 	var dates = null; //is range
			 	
			 	switch (str)
			 	{
			 		case 'this.day': 	
			 		case 'Today': 	
			 			singleDate = today;	
			 		break;
			 		case 'this.week': 	
			 		case 'This week': 		
			 			dates = [today.getStartOfWeek(), today.getEndOfWeek()];
			 		break; 
			 		case 'this.month': 	
			 		case 'This calendar month': 		
			 			dates = [today.getStartOfMonth(), today.getEndOfMonth()];
			 		break;
			 		case 'this.quarter':	
			 		case 'This quarter':
			 			dates = [today.getStartOfQuarter(), today.getEndOfQuarter()];
			 		break;
			 		case 'this.year':
			 		case 'This calendar year':		
			 			dates = [today.getStartOfYear(), today.getEndOfYear()];
			 		break;
			 		//PREVIOUS
			 		case 'previous.day':
			 		case 'Yesterday':  	
			 			singleDate = today.addDays(-1);
			 		break;
			 		case 'previous.week':
			 		case 'Previous week': 	
			 			var previousWeek = today.addDays(-7); //last week;
			 			dates = [previousWeek.getStartOfWeek(), previousWeek.getEndOfWeek()];
			 		break; 
			 		case 'previous.month':
			 		case 'Previous calendar month':
			 			var lastMonth = today.addMonths(-1);
			 			dates = [lastMonth.getStartOfMonth(), lastMonth.getEndOfMonth()];
			 		break;
			 		case 'previous.quarter':
			 		case 'Previous quarter':
			 			//previous quarter should be any day less 
			 			var lastQuarter = today.getStartOfQuarter().addDays(-1);
			 			dates = [lastQuarter.getStartOfQuarter(), lastQuarter.getEndOfQuarter()];
			 		break; 
			 		case 'previous.year':
			 		case 'Previous calendar year': 
			 			var lastYear = today.addYears(-1);
			 			dates = [lastYear.getStartOfYear(), lastYear.getEndOfYear()];
			 		break;
			 		//ENDING 
			 		case 'ending.week':
			 		case 'Last 7 days including today':
			 			dates = [today.addDays(-6), today];
			 		break; 
			 		case 'ending.month':
			 		case 'Last 30 days including today':
			 			dates = [today.addDays(-29), today];
			 		break;
			 		case 'Last 60 days including today':
			 		case 'ending_2.month':
			 			dates = [today.addDays(-59), today];
			 		break;
			 		case 'ending.quarter': 
			 		case 'Last 90 days including today':
			 			dates = [today.addDays(-89), today];
			 		break; 
			 		case 'ending.year':  
			 		case 'Last 12 months including today':
			 			dates = [today.addYears(-1).addDays(+1), today];
			 		break;   
			 		case 'ending_2.year':
			 		case 'Last 2 years including today':
			 			dates = [today.addYears(-2).addDays(+1), today];
			 		break;
			 		case 'ending_3.year':
			 		case 'Last 3 years including today':
			 			dates = [today.addYears(-3).addDays(+1), today];
			 		break;   
			 		case 'starting.day': 
			 		case 'Tomorrow':
			 			var next = today.addDays(7);
			 			dates = [next.getStartOfWeek(), next.getEndOfWeek()];
			 		break;
			 		case 'next.month':
			 		case 'Next calendar month':
			 			var next = today.addMonths(1);
			 			dates = [next.getStartOfMonth(), next.getEndOfMonth()];
			 		break;
			 		case 'next.quarter':
			 		case 'Next quarter':
			 			//next quarter should be any day more
			 			var next = today.getEndOfQuarter().addDays(1); 
			 			dates = [next.getStartOfQuarter(), next.getEndOfQuarter()];
			 		break; 
			 		case 'next.fiscal_year':
			 		case 'next.year':
			 		case 'Next fiscal year':
			 		case 'Next calendar year':
						var next = today.addYears(1);
						dates = [next.getStartOfYear(), next.getEndOfYear()];
			 		break;
			 		case 'starting.week': 
			 		case 'Next 7 days including today':
			 			dates = [today, today.addDays(6)];
			 		break;
			 		case 'starting.month':
			 		case 'Next 30 days including today':
			 			dates = [today, today.addDays(29)];
			 		break;
			 		case 'starting_2.month':
			 		case 'Next 60 days including today':
			 			dates = [today, today.addDays(59)];
			 		break;
			 		case 'starting.quarter': 
			 		case 'Next 90 days including today':
			 			dates = [today, today.addDays(89)];
			 		break;
			 		case 'starting.year':
			 		case 'Next 12 months including today':
			 			dates = [today, today.addYears(1).addDays(-1)];
			 		break;
			 		case 'current.week': 
			 		case 'Current week to':
			 			dates = [today.getStartOfWeek(), today];
			 		break;
			 		case 'current.month':
			 		case 'Current calendar month to':
			 			dates = [today.getStartOfMonth(), today];
			 		break;
			 		case 'current.year':
			 		case 'Current quarter to':
			 			dates = [today.getStartOfYear(), today];
			 		break;
			 		case 'current.quarter': 
			 		case 'Current calendar year to':
			 			dates = [today.getStartOfQuarter(), today];
			 		break;
			 		case 'earlier.day': 
			 		case 'To end of yesterday':
			 			dates = [null, today]; 
			 		break;
			 		case 'earlier.week':
			 		case 'To end of previous week':
			 			dates = [null, today.getStartOfWeek().addDays(-1)];
			 		break;
			 		case 'earlier.month':
			 		case 'To end of previous calendar month':
			 			dates = [null, today.getStartOfMonth().addDays(-1)];
			 		break;
			 		case 'earlier.quarter':
			 		case 'To end of previous quarter':
			 			dates = [null, today.getStartOfQuarter().addDays(-1)];
			 		break;
			 		case 'earlier.year': 
			 		case 'To end of previous calendar year':
			 			dates = [null, today.getStartOfYear().addDays(-1)];
			 		break;
			 		case 'greater.day':
			 		case 'From start of current day':
			 			dates = [today, null];
			 		break;
			 		case 'greater.week':
			 		case 'From start of current week':
			 			dates = [today.getStartOfWeek(), null];
			 		break;
			 		case 'greater.month':
			 		case 'From start of current calendar month':
			 			dates = [today.getStartOfMonth(), null];
			 		break;
			 		case 'greater.quarter':
			 		case 'From start of current quarter':
			 			dates = [today.getStartOfQuarter(), null];
			 		break;
			 		case 'greater.year':
			 		case 'From start of current calendar year':
			 			dates = [today.getStartOfYear(), null];
			 		break;
			 		case 'less.week':
			 		case 'To end of current week':
			 			dates = [null, today.getEndOfWeek()];
			 		break;
			 		case 'less.month': 
			 		case 'To end of current calendar month':
			 			dates = [null, today.getEndOfMonth()];
			 		break;
			 		case 'less.quarter': 
			 		case 'To end of current quarter':
			 			dates = [null, today.getEndOfQuarter()];
			 		break;
			 		case 'less.year':
			 		case 'To end of current calendar year':
			 			dates = [null, today.getEndOfYear()];
			 		break;
			 		case 'previous_2.day':
			 		case 'Previous 2 days':
			 			dates = [today.addDays(-2), today.addDays(-1)]; 
			 		break;
			 		case 'previous_2.week': 
			 		case 'Previous 2 weeks':
			 			var startWeek = today.getStartOfWeek().addDays(-14);
			 			var endWeek = today.getStartOfWeek().addDays(-1);
			 			dates = [startWeek, endWeek]; 
			 		break;
			 		case 'previous_2.month':
			 		case 'Previous 2 calendar months':
			 			var startMonth =  today.getStartOfMonth().addMonths(-2);
			 			var endMonth = today.getStartOfMonth().addDays(-1);
			 			dates = [startMonth, endMonth];
			 		break;
			 		case 'previous_2.quarter':  
			 		case 'Previous 2 quarters':
						var end = today.getStartOfQuarter().addDays(-1); //end of last Quarter
						var start = end.getStartOfQuarter().addDays(-1).getStartOfQuarter(); //last last Quarter
						var dates = [start, end];  
			 		break;
			 		case 'previous_2.year':
			 		case 'Previous 2 calendar years':
			 			var lastYear = today.getStartOfYear().addDays(-1); // end of last year
			 			var lastLastYear = today.addYears(-2).getStartOfYear(); //start of last last year
			 			dates = [lastLastYear, lastYear];
			 		break;
			 		case 'previous_before.day':
			 		case 'Day prior to yesterday':
			 			singleDate = today.addDays(-2);
			 		break;
			 		case 'previous_before.week':
			 		case 'Week prior to previous week':
			 			var end = today.getStartOfWeek().addDays(-1) //saturday of last week 
			 				.getStartOfWeek().addDays(-1); //saturday of last last week;
			 			var start = end.getStartOfWeek(); //sunday of last last week;
			 			
			 			dates = [start, end];
			 		break;
			 		case 'previous_before.month':
			 		case 'Month prior to previous calendar month': 
			 			var p = today.addMonths(-2);
			 			dates = [p.getStartOfMonth(), p.getEndOfMonth()];
			 		break;
			 		case 'previous_before.quarter':
			 		case 'Quarter prior to previous quarter':
			 			var end = today.getStartOfQuarter().addDays(-1) //last day of last quarter 
			 				.getStartOfQuarter().addDays(-1); //last day of last last quarter
			 			var start = end.getStartOfQuarter(); //first day of last last quarter;
			 			
			 			dates = [start, end];
			 		break;
			 		case 'previous_before.year':
			 		case 'Year prior to previous calendar year':
			 			var p = today.addYears(-2);
			 			dates = [p.getStartOfYear(), p.getEndOfYear()];
			 		break;
			 		case 'greater_previous.week':
			 		case 'From end of previous week':
			 			var p = today.getStartOfWeek().addDays(-1);   
			 			dates = [p, null]; 
			 		break;
			 		case 'greater_previous.month':
			 		case 'From end of previous calendar month':
			 			var p = today.getStartOfMonth().addDays(-1);   
			 			dates = [p, null]; 
			 		break;
			 		case 'greater_previous.quarter': 
			 		case 'From end of previous quarter':
			 			var p = today.getStartOfQuarter().addDays(-1);
			 			dates = [p, null]; 
			 		break;
			 		case 'greater_previous.year':
			 		case 'From end of previous calendar year':
			 			var p = today.getStartOfYear().addDays(-1);
			 			dates = [p, null];
			 		break;
			 	} 
			 	
			 	return singleDate || dates || false;
			 }
		}; 
	});
})(angular, CRM.$, CRM._);