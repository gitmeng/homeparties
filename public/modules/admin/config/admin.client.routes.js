'use strict';

// Setting up route
angular.module('admin').config(['$stateProvider',
	function($stateProvider) {
		// Requests admin routes
		$stateProvider.
		state('adminRequests', {
			url: '/admin/requests',
			templateUrl: 'modules/admin/views/admin-requests/list-requests.client.view.html'
		}).
		state('adminCreateRequest', {
			url: '/admin/requests/create',
			templateUrl: 'modules/admin/views/admin-requests/create-request.client.view.html'
		}).
		state('adminViewRequest', {
			url: '/admin/requests/:requestId',
			templateUrl: 'modules/admin/views/admin-requests/view-request.client.view.html'
		}).
		state('adminEditRequest', {
			url: '/admin/requests/:requestId/edit',
			templateUrl: 'modules/admin/views/admin-requests/edit-request.client.view.html'
		}).
		// Users admin routes
		state('adminUsers', {
			url: '/admin/users',
			templateUrl: 'modules/admin/views/admin-users/list-users.client.view.html'
		}).
		state('adminCreateUser', {
			url: '/admin/users/create',
			templateUrl: 'modules/admin/views/admin-users/create-user.client.view.html'
		});
	}
]);