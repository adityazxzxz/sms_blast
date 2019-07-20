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
db.Logs = require('../models/logs')(sequelize,Sequelize);
db.Sms = require('../models/sms')(sequelize,Sequelize);
db.Users = require('../models/user')(sequelize,Sequelize); 

db.Group.hasMany(db.Msisdn,{foreignKey:'group_id',sourceKey:'id'});
db.Msisdn.belongsTo(db.Group,{foreignKey:'group_id',targetKey:'id'});

// db.Sms.hasMany(db.Logs,{foreignKey:'content_id',targetKey:'id'});
module.exports = db;