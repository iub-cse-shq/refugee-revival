var mongoose = require('mongoose');
var Volunteer = require('./../models/Volunteer.js');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

module.exports.list = function(req, res) {
  Volunteer.find(function(err, data) {
    if (err) {
      return res.status(400).send({
		
  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      console.log("api called");

      res.status(200).send(data);
    }
  });
};

exports.new = function(req, res) {
	res.render('./../public/views/volunteer/create.ejs', {
		user: req.user || null,
		request: req
	});
};

exports.all = function(req, res) {  // 9:00 change made in class 
	res.render('./../public/views/volunteer/list.ejs', {											// { is the start of a JSON 
		user: req.user || null,	// sends session info, also request object
		request: req
	});
};


exports.view = function(req, res) {  // 9:00 change made in class 
	res.render('./../public/views/volunteer/view.ejs', {
		user: req.user || null,
		request: req
	});
};


exports.edit = function(req, res) {  // 9:00 change made in class 
	res.render('./../public/views/volunteer/edit.ejs', {
		user: req.user || null,
		request: req
	});
};


module.exports.create = function(req, res) {
  var volunteer = new Volunteer(req.body);
  volunteer.user = req.user;
  volunteer.save(function(err, data) {
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
  res.json(req.volunteer);
};


exports.delete = function(req, res) {
	var volunteer = req.volunteer;
	volunteer.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(volunteer);
		}
	});
};


module.exports.update = function(req, res) {
  var volunteer = req.volunteer;

  	volunteer = _.extend(volunteer, req.body);

  	volunteer.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json(volunteer);
  		}
  	});
};

exports.volunteerByID = function(req, res, next, id) {
	Volunteer.findById(id).populate('user', 'email').exec(function(err, volunteer) {
		if (err) return next(err);
		if (!volunteer) return next(new Error('Failed to load volunteer ' + id));
		req.volunteer = volunteer;
		next();
	});
};
