'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * User middleware
 */
 
 
exports.userByID = function(req, res, next, id) {
	User.findOne({
		_id: id
	}).exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load User ' + id));
		user.password = undefined;
   user.salt = undefined;
		req.profile = user;
		next();
	});
};



/**
 * Require login routing middleware
 */
 
 
exports.requiresLogin = function(req, res, next) {	// 10:1 checks if logged in 
		if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}

	next();
};


exports.checkForVolorOrg = function(req, res, next) {	// 10:1 checks if logged in 
		
		if ( !req.isAuthenticated()) {
			return res.status(401).send({
			
			message: 'User is not logged in'
			
			});
		}
		
		if(req.user.role != 'volunteer' || req.user.role !='organization'){
			return res.status(401).send({
				message: 'Only Volunteers and Organizations can view the page'	
			});
		}

	next();
};



/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
	var _this = this;

	return function(req, res, next) {
		_this.requiresLogin(req, res, function() {
			if (_.intersection(req.user.roles, roles).length) {
				return next();
			} else {
				return res.status(403).send({
					message: 'User is not authorized'
				});
			}
		});
	};
};
