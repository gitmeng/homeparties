'use strict';

// Setting up route
angular.module('admin').config(['$stateProvider',
	function($stateProvider) {
		// Requests state routing
		$stateProvider.
		state('adminRequests', {
			url: '/admin/requests',
			templateUrl: 'modules/admin/views/list-requests.client.view.html'
		}).
		state('adminCreateRequest', {
			url: '/requests/create',
			templateUrl: 'modules/admin/views/create-request.client.view.html'
		}).
		state('adminViewRequest', {
			url: '/requests/:requestId',
			templateUrl: 'modules/admin/views/view-request.client.view.html'
		}).
		state('adminEditRequest', {
			url: '/requests/:requestId/edit',
			templateUrl: 'modules/admin/views/edit-request.client.view.html'
		});
	}
]);