"use strict";

var path 	= require('path'),
	//redis 	= require("redis"),
    //client 	= redis.createClient(),
	_		= require('lodash');

/*client.on('error', function (err) {
    console.log(err);
});

client.on('connect', function () {
    console.log("Redis successfully connected");
});
*/

module.exports.fetch = function (headers) {
    if (headers && headers.authorization) {
        var authorization = headers.authorization;
        var part = authorization.split(' ');
        if (part.length === 2) {
            var token = part[1];
            return part[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports.retrieve = function (id, done) {

    //console.log("Calling retrieve for token: %s", id);

    if (_.isNull(id)) {
        return done(new Error("token_invalid"), {
            "message": "Invalid token"
        });
    }

    client.get(id, function (err, reply) {
        if (err) {
            return done(err, {
                "message": err
            });
        }

        if (_.isNull(reply)) {
            return done(new Error("token_invalid"), {
                "message": "Token doesn't exists, are you sure it hasn't expired or been revoked?"
            });
        } else {
            var data = JSON.parse(reply);
            debug("User data fetched from redis store for user: %s", data.username);

            if (_.isEqual(data.token, id)) {
                return done(null, data);
            } else {
                return done(new Error("token_doesnt_exist"), {
                    "message": "Token doesn't exists, login into the system so it can generate new token."
                });
            }

        }

    });

};

module.exports.middleware = function () {

    var func = function (req, res, next) {

        var token = exports.fetch(req.headers);

        exports.retrieve(token, function (err, data) {

            if (err) {
                req.username = undefined;
                //return next(new UnauthorizedAccessError("invalid_token", data));
            } else {
                req.username = _.merge(req.username, data);
                next();
            }

        });
    };

    func.unless = require("express-unless");

    return func;

};