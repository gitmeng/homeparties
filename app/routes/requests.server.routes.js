'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	requests = require('../../app/controllers/requests');

module.exports = function(app) {
	// Request Routes
	app.route('/requests')
		.get(users.requiresLogin, requests.list)
		.post(users.requiresLogin, requests.create);

	app.route('/requests/:requestId')
		.get(users.requiresLogin, requests.read)
		.put(users.requiresLogin, requests.update)
		.delete(users.requiresLogin, requests.delete);

	// Finish by binding the request middleware
	app.param('requestId', requests.requestByID);
};