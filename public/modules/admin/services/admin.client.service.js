'use strict';

//Requests service used for communicating with the requests REST endpoints
angular.module('admin').factory('Requests', ['$resource',
	function($resource) {
		return $resource('admin/requests/:requestId', {
			requestId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);