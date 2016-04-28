"use strict";

var express 	= require('express'),
	app			= express(),
	jwt 		= require('express-jwt'),
	path		= require('path'),
	utils 		= require(path.join(__dirname, 'utils.js')),
	unless		= require('express-unless'),
	fs 			= require('fs'),
	//api			= require('./api/login'),
	login		= require('./controllers/loginController'),
	video		= require('./controllers/videoController'),
	cert 		= {	key: fs.readFileSync('./cert/ssl.key/server.key'), cert: fs.readFileSync('./cert/ssl.crt/server.crt'), ca: fs.readFileSync('./cert/ssl.csr/server.csr') },
	https		= require('https').createServer(cert,app),
	io        	= require("socket.io")(https);

/* Port */
var port 		= 3000;

var jwtCheck = jwt({ secret: "everything is blue" });

jwtCheck.unless = unless;

//app.use(jwtCheck.unless({path: '/login'}));
//app.use(utils.middleware().unless({path: '/login'}));

app.get('/', function(req,res){
	res.send('Hello world!')
});

/*app.get('/login', api);
app.post('/login', api);*/

app.get('/login', login);
app.post('/login', login);

app.get('/video', video);

https.listen(port, function(req, res){
	console.log('Listening to port '+port);
});


