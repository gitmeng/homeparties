'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	requests = require('../../app/controllers/requests');

module.exports = function(app) {
	// Request Routes
	app.route('/requests')
		.get(requests.list)
		.post(users.requiresLogin, requests.create);

	app.route('/requests/:requestId')
		.get(requests.read)
		.put(users.requiresLogin, requests.hasAuthorization, requests.update)
		.delete(users.requiresLogin, requests.hasAuthorization, requests.delete);

	// Finish by binding the request middleware
	app.param('requestId', requests.requestByID);
};