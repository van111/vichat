"use strict";

var express 	= require('express'),
	app			= express(),
	bodyParser	= require('body-parser'),
	path 		= require('path'),
	approot 	= require('app-root-path'),
	auth		= require(approot.path+'/middlewares/auth');

app.set('view engine', "html");
app.engine('html', require('ejs').__express);
app.set('views', approot.path + '/views/login/');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/login', function(req,res){
	res.render('index')
})

app.post('/login', function(req,res){
	auth.createToken({username:req.body.username,password:req.body.password }, function(err, result){
		if (result) {
			res.json({status:'200 OK'})
		} else {
			res.json({error:'Error: Invalid username or password'})
		}
	});

})

module.exports = app