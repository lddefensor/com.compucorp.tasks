<?php

/** CUSTOM API Function **/

function civicrm_api3_tasks_get_relative_dates($params) {
	$values = CRM_Core_OptionGroup::values('relative_date_filters');
	$config = CRM_Core_Config::singleton();
    //if fiscal year start on 1 jan then remove fiscal year task
    //form list
    if ($config->fiscalYearStart['d'] == 1 & $config->fiscalYearStart['M'] == 1) {
      unset($values['this.fiscal_year']);
      unset($values['previous.fiscal_year']);
    }  
	
	//transform into array
	$return = array();
	
	foreach($values as $k=>$v)
	{
		$return[] = array('key' => $k, 'label' => $v);	
	}

	return $return;
}
 

/** END OF FILE **/
