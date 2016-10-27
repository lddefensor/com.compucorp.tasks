<?php

require_once 'tasks.civix.php';

/**
 * Implements hook_civicrm_config().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_config
 */
function tasks_civicrm_config(&$config) {
  _tasks_civix_civicrm_config($config);
}

/**
 * Implements hook_civicrm_xmlMenu().
 *
 * @param array $files
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_xmlMenu
 */
function tasks_civicrm_xmlMenu(&$files) { 
  _tasks_civix_civicrm_xmlMenu($files);
  var_dump($files);
}

/**
 * Implements hook_civicrm_install().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_install
 */
function tasks_civicrm_install() {
  _tasks_civix_civicrm_install();
}

/**
 * Implements hook_civicrm_uninstall().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_uninstall
 */
function tasks_civicrm_uninstall() {
  _tasks_civix_civicrm_uninstall();
}

/**
 * Implements hook_civicrm_enable().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_enable
 */
function tasks_civicrm_enable() {
  _tasks_civix_civicrm_enable();
}

/**
 * Implements hook_civicrm_disable().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_disable
 */
function tasks_civicrm_disable() {
  _tasks_civix_civicrm_disable();
}

/**
 * Implements hook_civicrm_upgrade().
 *
 * @param $op string, the type of operation being performed; 'check' or 'enqueue'
 * @param $queue CRM_Queue_Queue, (for 'enqueue') the modifiable list of pending up upgrade tasks
 *
 * @return mixed
 *   Based on op. for 'check', returns array(boolean) (TRUE if upgrades are pending)
 *                for 'enqueue', returns void
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_upgrade
 */
function tasks_civicrm_upgrade($op, CRM_Queue_Queue $queue = NULL) {
  return _tasks_civix_civicrm_upgrade($op, $queue);
}

/**
 * Implements hook_civicrm_managed().
 *
 * Generate a list of entities to create/deactivate/delete when this module
 * is installed, disabled, uninstalled.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_managed
 */
function tasks_civicrm_managed(&$entities) {
  _tasks_civix_civicrm_managed($entities);
}

/**
 * Implements hook_civicrm_caseTypes().
 *
 * Generate a list of case-types.
 *
 * @param array $caseTypes
 *
 * Note: This hook only runs in CiviCRM 4.4+.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_caseTypes
 */
function tasks_civicrm_caseTypes(&$caseTypes) {
  _tasks_civix_civicrm_caseTypes($caseTypes);
}

/**
 * Implements hook_civicrm_angularModules().
 *
 * Generate a list of Angular modules.
 *
 * Note: This hook only runs in CiviCRM 4.5+. It may
 * use features only available in v4.6+.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_caseTypes
 */
function tasks_civicrm_angularModules(&$angularModules) {
_tasks_civix_civicrm_angularModules($angularModules);
}

/**
 * Implements hook_civicrm_alterSettingsFolders().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_alterSettingsFolders
 */
function tasks_civicrm_alterSettingsFolders(&$metaDataFolders = NULL) {
  _tasks_civix_civicrm_alterSettingsFolders($metaDataFolders);
}

/**
 * Functions below this ship commented out. Uncomment as required.
 *

/**
 * Implements hook_civicrm_preProcess().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_preProcess
 *
function tasks_civicrm_preProcess($formName, &$form) {

} // */

/**
 * Implements hook_civicrm_navigationMenu().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_navigationMenu
*/ 
 
function _getMenuKeyMax($menuArray) {
  $max = array(max(array_keys($menuArray)));
  foreach($menuArray as $v) { 
    if (!empty($v['child'])) {
      $max[] = _getMenuKeyMax($v['child']); 
    }
  }
  return max($max);
}
function tasks_civicrm_navigationMenu(&$menu) {
 /* _tasks_civix_insert_navigation_menu($menu, NULL, array(
    'label' => ts('The Page', array('domain' => 'com.compucorp.tasks')),
    'name' => 'Compucorp Tasks',
    'url' => 'civicrm/compucorp',
    'permission' => 'access CiviReport,access CiviContribute',
    'operator' => 'OR',
    'separator' => 0,
  ));*/
  
  $maxKey = _getMenuKeyMax($menu) + 1;
$menu[$maxKey ] = array(
	 'attributes' => array (
          'label'      => 'Compucorp Tasks',
          'name'       => 'Compucorp Tasks',
          'url'        => null,
          'permission' => null,
          'operator'   => null,
          'separator'  => null,
          'parentID'   => null,
          'navID'      => $maxKey+1,
          'active'     => 1
          ),
     'child' => array(
	 	'1' => array(
			'attributes' => array(
				'label' => 'Open Weather App',
				'name' => 'Open Weather App',
				'url' => 'civicrm/a/#/weather',
				'operator' => null,
				'separator' => 1, 
				'parentID' => $maxKey ,
				'active' => 1,
				'navID' => 1
			) 
		),
	 	'2' => array(
			'attributes' => array(
				'label' => 'Membership',
				'name' => 'Membership',
				'url' => 'civicrm/a/#/membership',
				'operator' => null,
				'separator' => 1, 
				'parentID' => $maxKey ,
				'active' => 1,
				'navID' => 2
			) 
		)
	 )
); 
  _tasks_civix_navigationMenu($menu);
}   
