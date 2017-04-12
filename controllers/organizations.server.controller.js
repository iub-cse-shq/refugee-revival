var mongoose = require('mongoose');
var Organization = require('./../models/Organization.js');  // imports the code 
var errorHandler = require('./errors.server.controller'); // the file referred return ___ upon error
var _ = require('lodash');

module.exports.list = function(req, res) {
  Organization.find(function(err, data) {
    if (err) {
      return res.status(400).send({
  				message: errorHandler.getErrorMessage(err)
  			});
    } else{
      console.log("api called");
      res.status(200).send(data);
    }
  });
};

module.exports.create = function(req, res) {
  var organization = new Organization(req.body);
  organization.user = req.user;
  organization.save(function(err, data) {
  
  if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports.read = function(req, res) {
  res.json(req.organization);
};


exports.delete = function(req, res) {
	var organization = req.organization;
	organization.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(organization);
		}
	});
};

module.exports.update = function(req, res) {
  var organization = req.organization;

  	organization = _.extend(organization, req.body);

  	organization.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json(organization);
  		}
  	});
};



exports.organizationByID = function(req, res, next, id) {
	Organization.findById(id).populate('user', 'email').exec(function(err, organization) {
		if (err) return next(err);
		if (!organization) return next(new Error('Failed to load organization ' + id));
		req.organization = organization;
		next();
	});
};