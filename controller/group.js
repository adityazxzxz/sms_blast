const db = require('../db/database');

function Constructor() {

	const findGroup = (cond) => {
		return new Promise(resolve => {
			console.log(cond);
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



	this.get = async (req, res, next) => {
		var user_session = req.session;
		var mainpage = 'group_input';
		
		let group = await db.Group.findAll().catch(err => console.log(err));
		res.render('page/index', { user_session, mainpage, group });
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