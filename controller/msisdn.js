'use strict';

const db = require('../db/database');

function Constructor() {
	this.getall = async (req, res, next) => {
		var user_session = req.session;
        var mainpage = 'msisdn_input';
		let group = await db.Group.findAll();
		res.render('page/index', { user_session, mainpage, group });
	}
    
	this.save = (req, res, next) => {
		var id = req.body.group_id;
		var msisdn = req.body.msisdn;
		if (id && msisdn) {
			db.Msisdn.create({group_id:id,msisdn:msisdn}).then((result) => {
				return res.json({error:false,message:'Msisdn saved successfully!'});
			}).catch((err) => {
				console.log(err.errors[0].message);
				return res.json({error:true,message:err.errors[0].message});
			});
		} else {
			return res.json({ error: true, message: 'Complete the form!' });
		}

	}
}

module.exports = new Constructor();