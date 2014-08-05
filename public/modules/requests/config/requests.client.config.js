'use strict';

// Configuring the Requests module
angular.module('requests').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Homeparties', 'requests', 'dropdown'); //, '/articles(/create)?'
		Menus.addSubMenuItem('topbar', 'requests', 'Alla Homeparties', 'requests');
		Menus.addSubMenuItem('topbar', 'requests', 'Mina Homeparties');
		Menus.addSubMenuItem('topbar', 'requests', 'Hantera Homeparties', 'requests/create', undefined, undefined);
	}
]);