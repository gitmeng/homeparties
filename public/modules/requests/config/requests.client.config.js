'use strict';

// Configuring the Requests module
angular.module('requests').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Homeparties', 'requests', 'dropdown');
		Menus.addSubMenuItem('topbar', 'requests', 'Alla Homeparties', 'requests');
		Menus.addSubMenuItem('topbar', 'requests', 'Mina Homeparties', 'requests/myrequests');
		Menus.addSubMenuItem('topbar', 'requests', 'Nytt Homeparty', 'requests/create', undefined, undefined);
	}
]);