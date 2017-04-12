var mongoose = require('mongoose');
var Public_Post = require('./../models/Public\ Post.js');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

module.exports.list = function(req, res) {
  Public_Post.find(function(err, data) {
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
	res.render('./../public/views/publicpost/create.ejs', {
		user: req.user || null,
		request: req
	});
};

exports.all = function(req, res) {  // 9:00 change made in class 
	res.render('./../public/views/publicpost/list.ejs', {											// { is the start of a JSON 
		user: req.user || null,	// sends session info, also request object
		request: req
	});
};

exports.view = function(req, res) {  // 9:00 change made in class 
	res.render('./../public/views/publicpost/view.ejs', {
		user: req.user || null,
		request: req
	});
};

exports.edit = function(req, res) {  // 9:00 change made in class 
	res.render('./../public/views/publicpost/edit.ejs', {
		user: req.user || null,
		request: req
	});
};

module.exports.create = function(req, res) {
  var publicpost = new Public_Post(req.body);
  publicpost.user = req.user;
    publicpost.save(function(err, data) {
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
  res.json(req.publicpost);
};

exports.delete = function(req, res) {
	var publicpost = req.publicpost;
	publicpost.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(publicpost);
		}
	});
};

module.exports.update = function(req, res) {
  var publicpost = req.publicpost;

  	publicpost = _.extend(publicpost, req.body);

  	publicpost.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json(publicpost);
  		}
  	});
};

exports.publicpostByID = function(req, res, next, id) {
	Public_Post.findById(id).populate('user', 'email').exec(function(err, publicpost) {
		if (err) return next(err);
		if (!publicpost) return next(new Error('Failed to load publicpost ' + id));
		req.publicpost = publicpost;
		next();
	});
};