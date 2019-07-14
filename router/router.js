'use strict';

var session = require('../helper/session_helper');
var user = require('../controller/user');
var sms = require('../controller/sms');
module.exports = {
	configure:(app) => {
		app.route('/').get(session,(req,res) => res.redirect('/home'));
		app.route('/login').get(user.signin);
		app.route('/home').get(session,user.home);
		app.route('/logout').get(session,user.logout);
		app.route('/input').get(session,sms.input);
		app.route('/sms').get(session,sms.sms);
		app.route('/group').get(session,sms.group);
		app.route('/log/detail/:id').get(session,sms.log);
		app.route('/msisdndetail/:id').get(session,sms.msisdndetail);


		//POST

		app.route('/login').post(user.login);
		app.route('/sendsms').post(session,sms.sendsms);
		app.route('/inputmsisdn').post(session,sms.inputmsisdn);
		app.route('/savegroup').post(session,sms.savegroup);
		app.route('/msisdn/delete').post(session,sms.delete);
		

		// app.route('/home').get((req,res,next) => {
		// 	res.render('page/home')
		// });
		

	}
};

