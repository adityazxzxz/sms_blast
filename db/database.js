const Sequelize = require('sequelize');
const db = {};
const sequelize = new Sequelize('pusbangfilemdb','root','',{
	host:'localhost',
	dialect:'mysql',
	operatorAliases:false,
	pool:{
		max:5,
		min:0,
		acquire:30000,
		idle:10000
	}
});

db.Sequelize = Sequelize;

db.Msisdn = require('../models/msisdn')(sequelize,Sequelize);
db.Group = require('../models/group')(sequelize,Sequelize);
module.exports = db;