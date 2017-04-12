var mongoose = require('mongoose');
var Vol_don = require('./../models/Vol_don.js');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

module.exports.list = function(req, res) {
  Vol_don.find(function(err, data) {
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
	res.render('./../public/views/vol_don/create.ejs', {
		user: req.user || null,
		request: req
	});
};

exports.all = function(req, res) {  // 9:00 change made in class 
	res.render('./../public/views/vol_don/list.ejs', {											// { is the start of a JSON 
		user: req.user || null,	// sends session info, also request object
		request: req
	});
};


exports.view = function(req, res) {  // 9:00 change made in class 
	res.render('./../public/views/vol_don/view.ejs', {
		user: req.user || null,
		request: req
	});
};


exports.edit = function(req, res) {  // 9:00 change made in class 
	res.render('./../public/views/vol_don/edit.ejs', {
		user: req.user || null,
		request: req
	});
};


module.exports.create = function(req, res) {
  var vol_don = new Vol_don(req.body);
  vol_don.user = req.user;
  vol_don.save(function(err, data) {
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
  res.json(req.vol_don);
};


exports.delete = function(req, res) {
	var vol_don = req.vol_don;
	vol_don.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(vol_don);
		}
	});
};


module.exports.update = function(req, res) {
  var vol_don = req.vol_don;

  	vol_don = _.extend(vol_don, req.body);

  	vol_don.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json(vol_don);
  		}
  	});
};

exports.vol_donByID = function(req, res, next, id) {
	Vol_don.findById(id).populate('user', 'email').exec(function(err, vol_don) {
		if (err) return next(err);
		if (!vol_don) return next(new Error('Failed to load vol_don ' + id));
		req.vol_don = vol_don;
		next();
	});
};
