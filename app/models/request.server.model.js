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
	published: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		trim: true,
		required: 'Titel måste anges.'
	},
	date: {
		type: Date
	},
	time: {
		type: Date
	},
	location: {
		type: String,
		default: '',
		trim: true
	},
	city: {
		type: String,
		default: '',
		trim: true
	},
	contactName: {
		type: String,
		default: '',
		trim: true
	},
	contactEmail: {
		type: String,
		default: '',
		trim: true,
		required: 'Förfrågarens e-postadress måste anges.'
	},
	otherInfo: {
		type: String,
		default: '',
		trim: true
	}/*,
	speaker: {
		type: Schema.ObjectId,
		ref: 'User'
	}*/
});

// Compiling the Request schema into a Model
mongoose.model('Request', RequestSchema);