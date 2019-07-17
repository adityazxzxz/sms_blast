'use strict';

const db = require('../db/database');

function Constructor() {
	this.getall = async (req, res, next) => {
		var user_session = req.session;
        var mainpage = 'msisdn_input';
		let results = await db.Group.findAll({
		});
		let msisdn = await db.Msisdn.findAll();
		console.log(results);
		res.render('page/index', { user_session, mainpage, results, msisdn });
	}
    
	this.save = (req, res, next) => {
		var group = req.body.name;
		var source = req.body.source;
		if (group && source) {
			db.query("INSERT INTO p_group (name,source) values(?,?)", [group, source], (error, results) => {
				if (error) {
					console.log(error);
					return res.json({ error: true, message: 'something wrong' });
				}
				return res.json({ error: false, message: 'Input group success' });
			});
		} else {
			return res.json({ error: true, message: 'Fill text box' });
		}

	}
}

module.exports = new Constructor();