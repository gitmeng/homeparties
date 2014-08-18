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

	if (typeof request.time !== 'undefined' && typeof request.date !== 'undefined') {
		// Get hour and min from time
		var timeArray = request.time.split(':');
		var hour = timeArray[0];
		var min = timeArray[1];

		// Add missing user fields
		request.dateTime = request.dateTime.setHours(hour, min);
	}

	delete request.time;
	delete request.date;

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

	req.body.dateTime = req.body.date.setHours();

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
	if (req.user.roles === 'admin') {
		return res.send(403, {
			message: 'User is not authorized'
		});
	}
	next();
};
