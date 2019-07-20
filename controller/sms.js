const db = require('../db/database');
const conf = require('../config/config');
var axios = require('axios');

function Constructor() {

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

	const findContent = () => {
		return new Promise(resolve => {
			var query = 'SELECT * FROM p_sms_content ORDER BY id DESC';
			db.query(query, (err, rows, fields) => {
				if (err) {
					console.log(err);
				} else {
					resolve(rows);
				}
			});
		});
	}

	const findLog = (groupid) => {
		return new Promise(resolve => {
			var query = 'SELECT a.* FROM p_logs a LEFT JOIN p_sms_content b ON b.id=a.content_id WHERE content_id=? ORDER BY a.id DESC';
			db.query(query, [groupid],
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


	const deleteMsisdn = (id) => {
		return new Promise(resolve => {
			var query = 'delete from p_msisdn where id=?';
			db.query(query, [id], (err, rows, fields) => {
				if (err) {
					console.log(err);
				} else {
					resolve(rows);
				}
			});
		});
	}

	this.delete = async (req, res, next) => {
		var id = req.body.id;
		let results = await deleteMsisdn(id);
		console.log(results);
		if (results.affectedRows > 0) {
			res.json({ error: false, message: "Delete Succeed" });
		} else {
			res.json({ error: true, message: "Delete Failed" });
		}
	}

	this.input = async (req, res, next) => {
		var user_session = req.session;
		var mainpage = 'msisdn_input';
		let results = await findGroup();
		res.render('page/index', { user_session, mainpage, results });
	}

	this.sms = async (req, res, next) => {
		var user_session = req.session;
		var mainpage = 'send_sms';
		let group = await db.Group.findAll().catch((err) => console.log(err));
		let smscontent = await db.Sms.findAll({order:[['id','DESC']]}).catch((err) => console.log(err));
		res.render('page/index', { user_session, mainpage, group, smscontent });
	}


	this.log = async (req, res, next) => {
		var id = req.params.id;
		var user_session = req.session;
		var mainpage = 'log';
		let log = await db.Logs.findAll({where:{content_id:id},order:[['id','DESC']]}).catch((err) => console.log(err));
		res.render('page/index', { user_session, mainpage, log });
	}


	this.send = async (req, res, next) => {
		var msg = req.body.message;
		var id = req.body.group_id;

		if (msg && id) {
			var msisdn_data = await db.Msisdn.findAll({
				where: {
					group_id: id
				},
				include: [{
					model: db.Group,
					as: 'group',
					where: {
						id: id
					}
				}]
			}).then((data) => {
				if (data) {
					db.Sms.create({content:msg}).then((sms) => {
						data.forEach((msisdn) => {
							console.log('msisdn ', msisdn.msisdn);
							db.Logs.create({ content_id: sms.id, msisdn: msisdn.msisdn }).then((log) => {
								if (log) {
									console.log('Source ', msisdn.group.source);
									console.log('Content id ',sms.id);
									console.log('Log id ',log.id);
									axios.get('https://httpsmsc.montymobile.com/HTTP/api/Client/SendSMS', {
										params: {
											username: conf.m_username,
											password: conf.m_password,
											destination: msisdn.msisdn,
											source: msisdn.group.source,
											text: msg,
											dataCoding: conf.m_datacoding
										}
									}).then((res) => {
										var status = (res.data.ErrorCode === 0) ? 'success' : 'fail';
										db.Logs.update({
											status: status,
											response: JSON.stringify(res.data)
										}, {
												where: {
													id: log.id
												}
											})
									}).catch((err) => console.log(err));
								}
							}).catch((err) => console.log(err));
	
						});
					})
					
				}

			}).catch((err) => {
				console.log(err);
				res.json({ error: true, message: 'something wrong!' });
			});


			res.json({ error: false, message: 'OK' });

		}
	}

}

module.exports = new Constructor();