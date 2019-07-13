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

	const msisdnList = (id) => {
		return new Promise(resolve => {
			var query = 'SELECT * FROM p_msisdn WHERE group_id=? ORDER BY id DESC';
			db.query(query, [id],
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
		var id = req.params.id;
		let results = await deleteMsisdn(id);
		console.log(results);
		res.redirect('/group');
	}

	this.msisdndetail = async (req, res, next) => {
		var user_session = req.session;
		var id = req.params.id;
		let results = await msisdnList(id);
		console.log(results);
		var mainpage = 'msisdn_list';
		res.render('page/index', { user_session, mainpage, results });
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
		let results = await findGroup();
		let smscontent = await findContent();
		res.render('page/index', { user_session, mainpage, results, smscontent });
	}

	this.group = async (req, res, next) => {
		var user_session = req.session;
		var mainpage = 'group_input';
		let results = await findGroup();
		res.render('page/index', { user_session, mainpage, results });
	}

	this.log = async (req, res, next) => {
		var id = req.params.id;
		var user_session = req.session;
		var mainpage = 'log';
		let results = await findLog(id);
		res.render('page/index', { user_session, mainpage, results });
	}

	this.savegroup = (req, res, next) => {
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

	this.sendsms = (req, res, next) => {
		var message = req.body.message;
		var group_id = req.body.group_id;
		if (message && group_id) {
			db.query("SELECT * FROM p_msisdn WHERE group_id=? limit 1", [group_id], (err, data) => {
				if (err)
					console.log('Error ', err);
				if (data && data.length) {
					db.query('SELECT a.*,b.source FROM p_msisdn a JOIN p_group b ON b.id=a.group_id WHERE a.group_id=?', [group_id], (error, dataraw) => {
						if (error) {
							console.log(error);
							return res.json({ error: true, message: 'something wrong' });
						}
						db.query("INSERT INTO p_sms_content (content) values (?)", [message], (err, datainsert) => {
							if (err) {
								console.log(err);
								return res.json({ error: true, message: 'something wrong' });
							}
							console.log(datainsert.insertId);
							dataraw.forEach(function (datauser) {
								console.log(datauser);
								db.query('INSERT INTO p_logs (content_id,msisdn) values(?,?)', [datainsert.insertId, datauser.msisdn], (err, data) => {
									if (err) throw err;
									console.log('p_logs ', datauser.msisdn);
									axios.get('https://httpsmsc.montymobile.com/HTTP/api/Client/SendSMS', {
										params: {
											username: conf.m_username,
											password: conf.m_password,
											destination: datauser.msisdn,
											source: datauser.source,
											text: message,
											dataCoding: conf.m_datacoding
										}
									}).then((res) => {
										var status = (res.data.ErrorCode === 0) ? 'success' : 'fail';
										db.query('UPDATE p_logs set status=?,response=? where id=?', [status, JSON.stringify(res.data), data.insertId], (error, data) => {
											if (error) {
												console.log(error);
												return res.json({ error: true, message: 'something wrong' });
											}
										});
									})
										.catch((errorr) => {
											console.log(errorr);
										});
								});

							});
						});
					});
					return res.json({ error: false, 'message': 'Success' });
				} else {
					return res.json({ error: true, 'message': 'Msisdn not found' });
				}
			});
		} else {
			return res.json({ error: true, 'message': 'Fill input box' });
		}
	}

	this.inputmsisdn = (req, res, next) => {
		var msisdn = req.body.msisdn;
		var group = req.body.group_id;
		if (msisdn && group) {
			db.query('INSERT IGNORE INTO p_msisdn(group_id,msisdn) values(?,?)', [group, msisdn], (error, data) => {
				if (error) {
					console.log(error);
					return res.json({ error: true, message: 'something wrong' });
				}

				return res.json({ 'error': false, 'message': 'Success' });
			});
		} else {
			return res.json({ 'error': true, 'message': 'Fill the text box!' });
		}
	}
}

module.exports = new Constructor();