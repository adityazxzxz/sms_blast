'use strict';

var session = require('../helper/session_helper');
var user = require('../controller/user');
var sms = require('../controller/sms');
var group = require('../controller/group');
var msisdn = require('../controller/msisdn');

module.exports = {
	configure:(app) => {
		app.route('/').get(session,(req,res) => res.redirect('/home'));
		app.route('/login').get(user.signin);
		app.route('/home').get(session,user.home);
		app.route('/logout').get(session,user.logout);
		
		
		
		app.route('/log/detail/:id').get(session,sms.log);
		app.route('/msisdndetail/:id').get(session,sms.msisdndetail);

		//Sms
		app.route('/sms').get(session,sms.sms);
		app.route('/sms/send').post(session,sms.sendsms);

		//Group
		app.route('/group').get(session,group.get);
		app.route('/group/save').post(session,sms.savegroup);

		//MSISDN
		app.route('/msisdn').get(session,msisdn.getall);

		//POST

		app.route('/login').post(user.login);
		
		app.route('/inputmsisdn').post(session,sms.inputmsisdn);
		
		app.route('/msisdn/delete').post(session,sms.delete);
		

		// app.route('/home').get((req,res,next) => {
		// 	res.render('page/home')
		// });
		

	}
};

