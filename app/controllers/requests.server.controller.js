'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Request = mongoose.model('Request'),
	_ = require('lodash');

// Filter the requests by the user's role. If not admin, the list of requests will not include unpublished requests.
function filterByRole(roles, query) {
	if (roles.indexOf('admin')<0) {
		query = query.where('published').equals(true);
	}

	if (roles.indexOf('admin')<0 && roles.indexOf('user')<0) {
		return false;
	}
	return query;
}

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
		case 11000:
		case 11001:
			message = 'Request already exists';
			break;
		default:
			message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a request
 */
exports.create = function(req, res) {
	var request = new Request(req.body);

	request.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(request);
		}
	});
};

/**
 * Show the current request
 */
exports.read = function(req, res) {
	res.jsonp(req.request);
};

/**
 * Update a request
 */
exports.update = function(req, res) {
	var request = req.request;

	request = _.extend(request, req.body);

	request.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(request);
		}
	});
};

/**
 * Delete an request
 */
exports.delete = function(req, res) {
	var request = req.request;

	request.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(request);
		}
	});
};

/**
 * List of Requests
 */
exports.list = function(req, res) {
	var query = Request.find();

	query = filterByRole(req.user.roles, query);

	if (!query) {
		return res.send(403, {
			message: 'User is not authorized'
		});
	}
	
	query.sort('-created').populate('user', 'displayName').exec(function(err, requests) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(requests);
		}
	});
};

/**
 * Request middleware
 */
exports.requestByID = function(req, res, next, id) {
	var query = Request.findOne().where('_id').equals(id);
	query = filterByRole(req.user.roles, query);

	if (!query) {
		return res.send(403, {
			message: 'User is not authorized'
		});
	}

	query.populate('user', 'displayName').exec(function(err, request) {
		if (err) return next(err);
		if (!request) return next(new Error('Failed to load request ' + id));
		req.request = request;
		next();
	});
};

/**
 * Request authorization middleware
 */
/*
exports.hasAuthorization = function(req, res, next) {
	if (req.user.roles.indexOf('admin')<0) {
		return res.send(403, {
			message: 'User is not authorized'
		});
	}
	next();
};
*/
