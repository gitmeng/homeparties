'use strict';

// Configuring the Requests module
angular.module('requests').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Förfrågningar', 'requests', 'item');
		Menus.addMenuItem('topbar', 'Mina Homeparties', 'requests/myrequests', 'item');
	}
]);