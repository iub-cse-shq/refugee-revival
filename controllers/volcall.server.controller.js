var mongoose = require('mongoose');
var Vol_Call = require('./../models/Volunteer\ Call.js');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

module.exports.list = function(req, res) {
  Vol_Call.find(function(err, data) {	// see if the file is there
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)	// send message that the file is not 

  			});
    } else {
      console.log("api called");

      res.status(200).send(data);
    }
  });
};

/*

i siad that you create a new user object with its authentication 
and stuff like copy everything on the user and make it clalled 
volunteer or vol ok then when you say req.user you say req.vol ez
so your sign in page should have two radio buttn ooptions whether theyare vol or user 
and the database will hadnle it u just get the backned fixed for this ok mah nigga

go to create.ejs page 

*/


// 12:19 
exports.new = function(req, res) {
	
	res.render('./../public/views/volcall/create.ejs', {
		
		user: req.user || null,	// write
		request: req 
		
		/*
		copy the whole user and rename everythin to vol so that you can write 
		req.vol when i say rename user im talking about everything in routes controllers etc 
		authentical and all that shit
		*/	
	});
};

exports.all = function(req, res) {  // show the page with the posts 

	res.render('./../public/views/volcall/list.ejs', {											// { is the start of a JSON 
		user: req.user || null,	// sends session info, also request object
		request: req
	});
	
};


exports.view = function(req, res) {  
	
	res.render('./../public/views/volcall/view.ejs', {
		user: req.user || null,
		request: req
	});
	
};

exports.edit = function(req, res) {  // edit the status of each post 
	
	res.render('./../public/views/volcall/edit.ejs', {
		user: req.user || null,
		request: req
	});
	
};


module.exports.create = function(req, res){
  var user = new Vol_Call(req.body);
  user.user = req.user;
  user.save(function(err, data) {
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
  res.json(req.user);
};


exports.delete = function(req, res) {
	var user = req.user;
	user.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(user);
		}
	});
};


module.exports.update = function(req, res) {
  var user = req.user;

  	user = _.extend(user, req.body);

  	user.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json(user);
  		}
  	});
};

exports.userByID = function(req, res, next, id) {
	Vol_Call.findById(id).populate('user', 'email').exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load user ' + id));
		req.user = user;
		next();
	});
};
