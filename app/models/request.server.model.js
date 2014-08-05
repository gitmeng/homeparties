'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Request Schema
 */

var RequestSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Titel måste anges.'
	},
	date: {
		type: Date,
		min: Date.now
	},
	time: {
		type: Date
	},
	location: {
		type: String,
		trim: true
	},
	city: {
		type: String
	},
	contactName: {
		type: String
	},
	contactEmail: {
		type: String
	},
	otherInfo: {
		type: String,
		default: '',
		trim: true
	},
	speaker: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

// Compiling the Request schema into a Model
mongoose.model('Request', RequestSchema);