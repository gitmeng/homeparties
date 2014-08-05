'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Request = mongoose.model('Request'),
	_ = require('lodash');

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
	//request.user = req.user;

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
	Request.find().sort('-created').populate('user', 'displayName').exec(function(err, requests) {
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
	Request.findById(id).populate('user', 'displayName').exec(function(err, request) {
		if (err) return next(err);
		if (!request) return next(new Error('Failed to load request ' + id));
		req.request = request;
		next();
	});
};

/**
 * Request authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.user.roles !== 'user') {
		return res.send(403, {
			message: 'User is not authorized'
		});
	}
	next();
};