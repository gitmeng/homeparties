'use strict';

//Requests service used for communicating with the requests REST endpoints
angular.module('requests').factory('Requests', ['$resource',
	function($resource) {
		return $resource('requests/:requestId', {
			requestId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);