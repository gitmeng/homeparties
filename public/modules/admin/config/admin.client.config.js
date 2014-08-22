'use strict';

// Configuring the Requests module
angular.module('admin').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Admin', 'admin', 'dropdown', undefined, false, ['admin']);
		Menus.addSubMenuItem('topbar', 'admin', 'Hantera Homeparties', 'admin/requests');
		Menus.addSubMenuItem('topbar', 'admin', 'Hantera Användare', 'admin/users');
	}
]);