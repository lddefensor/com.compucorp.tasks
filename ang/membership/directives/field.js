(function(angular, $, _) {
	var app = angular.module('membership');
	app.directive('field', function(){
	 	return {
	 		restrict: 'A',
	 		scope: {
	 			field: '=field'
	 		},
	 		controller: function(){
	 		},
	 		controllerAs: 'fieldCtlr',
	 		link: function(scope, element, attributes)
	 		{ 
	 			var parent = scope.$parent; // access row
	 			var row = parent.rowdata; //access data in row
	 			
	 			if(!row) return; //empty
	 			element = element[0]; // access dom
	 			
	 			var field = scope.field;
	 			 
	 			if(field.mapping)
	 			{ 
	 				if(field.mapping.scope)
	 				{
	 					var setValue = function(){
	 						var data = field.mapping.scope[field.mapping.data];
 							var fkey = row[field.mapping.fkey] * 1;
 							element.innerText = data[fkey][field.mapping.display_name] || ''; 
	 					};
	 					
	 					if(field.mapping.scope[field.mapping.data])
	 					{
	 						setValue();
	 					}
	 					else
	 					{ 
	 						//momentarily set a fetching something
	 						element.innerHTML = '<i>Fetching...</i>';
		 					field.mapping.scope.$watch(field.mapping.data, function(newValue, oldValue, gridScope){
		 						if(newValue != oldValue)
		 						{
		 							setValue();
		 						}
		 					});
	 					}
	 				}
	 				 
	 			}
	 			else if(field.transform)
	 			{	
	 				//transform should be a function
	 				if(typeof(field.transform) == 'function')
	 				{
	 					var txt = field.transform(row[field.name] || '');
	 					element.innerText = txt;
	 				}
	 				
	 			}
	 			else 
	 			{
	 				element.innerText = row[field.name] || '--';
	 			}
	 		}
	 	};
	 	
	 }); 
	
})(angular, CRM.$, CRM._);