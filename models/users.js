var Sequelize = require('sequelize');
var bcrypt = require('bcryptjs');
var seq = new Sequelize('videochat', 'root', '', 'localhost',{ timezone: '+08:00', logging:false });

exports.connection = seq;

exports.users = seq.define('users',
{
	id: {type: Sequelize.INTEGER, primaryKey: true},
	username: Sequelize.STRING(250),
	password: Sequelize.STRING(255),
	token: Sequelize.STRING(50)
}, {
    instanceMethods: {
        comparePassword : function(candidatePassword, cb) {
            bcrypt.compare(candidatePassword, this.getDataValue('password'), function(err, isMatch) {
                if(err) return cb(err);
                cb(null, isMatch);
            });
        },
        setToken: function(){
            // bla bla bla
            // bla bla bla
        }
    }
});
