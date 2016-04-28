"use strict";

var	_		= require('lodash'),
	jwt		= require('jsonwebtoken'),
	approot = require('app-root-path'),
	Users	= require(approot+'/models/users');

exports.createToken = function(req, callback) {
	console.log('Processing authenticate')
	var username = req.username;
	var password = req.password;

	if (_.isEmpty(username) || _.isEmpty(password)) {
		console.log('Invalid username or passowrd')
	}
	
	Users.users.findOne({
		where:{username: username}
	}).then(function (user,err){
		console.log(err)
		if (err || !user) {
			console.log('Error: Invalid username or password')
			callback(err, err);
		}else {
			user.comparePassword(password, function(err, isMatch){
				if (isMatch && !err) {
					console.log('create a token')
					callback(null,isMatch)
				} else {
					console.log('wrong again!!!')
				}
			});
		}
	});

}
