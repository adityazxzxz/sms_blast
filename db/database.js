var mysql = require('mysql');
var conf = require('../config/config.js');


var config = {
		connectionLimit:5,
		host:conf.db_host,
		user:conf.db_user,
		password:conf.db_password,
		database:conf.db_database,
		timezone:'utc'
	};
var con =  mysql.createPool(config);

module.exports = con;