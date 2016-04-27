"use strict";

var express 	= require('express'),
	app			= express(),
	jwt 		= require('express-jwt'),
	path		= require('path'),
	utils 		= require(path.join(__dirname, 'utils.js')),
	unless		= require('express-unless'),
	//api			= require('./api/login'),
	login			= require('./controllers/loginController');

/* Port */
var port 		= 3000;

var jwtCheck = jwt({ secret: "everything is blue" });

jwtCheck.unless = unless;

//app.use(jwtCheck.unless({path: '/login'}));
app.use(utils.middleware().unless({path: '/login'}));

app.get('/', function(req,res){
	res.send('Hello world!')
});

/*app.get('/login', api);
app.post('/login', api);*/

app.get('/login', login);
app.post('/login', login);

app.listen(port, function(req, res){
	console.log('Listening to port '+port);
});




