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

		//Sms
		app.route('/sms').get(session,sms.sms);
		app.route('/sms/send').post(session,sms.send);

		//Group
		app.route('/group').get(session,group.get);
		app.route('/group/save').post(session,group.save);
		app.route('/group/msisdn/:id').get(session,msisdn.getByGroup);

		//MSISDN
		app.route('/msisdn').get(session,msisdn.getall);
		app.route('/msisdn/save').post(session,msisdn.save);
		app.route('/msisdn/delete').post(session,msisdn.delete);

		//POST

		app.route('/login').post(user.login);
		
		
		
		
		

		// app.route('/home').get((req,res,next) => {
		// 	res.render('page/home')
		// });
		

	}
};

