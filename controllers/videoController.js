"use strict";

var express 	= require('express'),
	app			= express(),
	bodyParser	= require('body-parser'),
	path 		= require('path'),
	approot 	= require('app-root-path'),
	opentok		= require(approot.path+'/SDK/opentok'),
	fs 			= require('fs'),
	cert 		= {	key: fs.readFileSync(approot.path+'/cert/ssl.key/server.key'), cert: fs.readFileSync(approot.path+'/cert/ssl.crt/server.crt'), ca: fs.readFileSync(approot.path+'/cert/ssl.csr/server.csr') },
	https		= require('https').createServer(cert,app),
	io        	= require("socket.io")(https),
	usernames 	= {};

app.set('view engine', "html");
app.engine('html', require('ejs').__express);
app.set('views', approot.path + '/views/video/');
app.use(express.static( approot.path + '/public/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/video', function(req,res){
	res.render('index')
})


io.sockets.on('connection', function (socket) {
	opentok.makeSession(function(callback){
		if (callback) {
			opentok.makeToken({sessionID:callback}, function(req, cb){
				//console.log(cb)
				socket.emit('getSesToken', { getSesToken: cb });
			})
		}
	});

	socket.on('join', function(params) {
        socket.join(params.room);
        socket.username = params.username;
        socket.room = params.room;
        usernames[params.username] = params.username;
        io.sockets.in(params.room).emit('message', 'what is going on, party people?');
        console.log(socket)
        console.log(usernames)
    });



});

https.listen(3001)

module.exports = app