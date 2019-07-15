'use strict';

const db = require('../db/database');

function Constructor() {

	const getall = () => {
		return new Promise(resolve => {
			var query = "SELECT b.name,a.* FROM p_msisdn a JOIN p_group b ON b.id=a.group_id ORDER BY a.id DESC";
			db.query(query,
				function (error, rows, fields) {
					if (error) {
						console.log(error)
					}
					else {
						resolve(rows); 
					}
				});
		});
	}

	const findGroup = () => {
		return new Promise(resolve => {
			var query = 'SELECT * FROM p_group ORDER BY id DESC';
			db.query(query,
				function (error, rows, fields) {
					if (error) {
						console.log(error)
					}
					else {
						resolve(rows); //Kembalian berupa kontak data
					}
				});
		});
	}



	this.getall = async (req, res, next) => {
		var user_session = req.session;
        var mainpage = 'msisdn_input';
		let results = await findGroup();
		let msisdn = await getall();
		res.render('page/index', { user_session, mainpage, results,msisdn });
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