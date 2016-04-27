"use strict";

var express = require('express'),
	app		= express();

app.get('/login', function(req,res){
	res.json({test:'everything is blue'})
})

app.post('/login', function(req,res){
	res.json({post:'mah post'})
})

module.exports = app