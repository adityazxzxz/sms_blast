'use strict';

const db = require('../db/database');

function Constructor() {
	this.getall = async (req, res, next) => {
		var user_session = req.session;
        var mainpage = 'msisdn_input';
		let group = await db.Group.findAll().catch(err => console.log(err));
		res.render('page/index', { user_session, mainpage, group });
	}
    
	this.save = async (req, res, next) => {
		var group = req.body.group_id;
		var msisdn = req.body.msisdn;
		if (group && msisdn) {
			let query = await db.Msisdn.findOrCreate({
				where:{
					msisdn:msisdn.trim(),
					group_id:group.trim()
				},
				defaults:{
					msisdn:msisdn.trim(),
					group_id:group.trim()
				}
			}).then(([data,isCreated]) => {
				console.log(isCreated);
				if(isCreated){ //jika berhasil create
					return res.json({error:false,message:'Insert Msisdn succeed!'});
				}else{
					return res.json({error:true,message:'Msisdn already exist!'});
				}
			}).catch(err => {
				console.log(err);
				return res.json({error:true,message:'Something wrong'});
			});
		} else {
			return res.json({ error: true, message: 'Fill text box' });
		}

	}
}

module.exports = new Constructor();