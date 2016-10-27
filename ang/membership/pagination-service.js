(function(angular, $, _) {
	var app = angular.module('membership');
	
	app.factory('Pagination', function(){
	
		return {
			updatePaginationState: function(state){ 
				state.pages = Math.ceil(state.count/state.numItems); 
				return this.updatePaginationRange(state);
			},
			updatePaginationRange: function(state){
				state.rangeStart = (state.current >= state.pageLink) ? state.current - 3 : 1;
				state.rangeEnd = ( (state.current + state.pageLink) > state.pages ) ? state.pages : (state.current + 5);
					
				var list = [];
				for (var i=state.rangeStart; i<=state.rangeEnd; i++) {
			      list.push(i);
			    }
				state.list = list; 
				return state;
			} 
		};
		
	});
})(angular, CRM.$, CRM._);