const db = require('../db/database');
const md5 = require('md5');

function Constructor(){
	this.signin = (req,res) =>{
		res.render('page/login');
	}
	this.login = (req,res) => {
		var username = req.body.username;
		var password = req.body.password;
		if(username && password){
				db.Users.findOne({
					where:{
						username:username,
						password:md5(password)
					}
				}).then((result) => {
					if(result){
						req.session.loggedin = true;
						req.session.username = username;
						res.redirect('/');
					}else{
						res.redirect('/login');
					}
				}).catch((err) => res.redirect('/login'));
		}else{
			console.log('username or pass not match');
			res.redirect('/login');
		}
	}


	this.logout = (req,res,next) => {
		if(req.session){
				req.session.destroy((err) => {
					if(err){
						return next(err);
					}else{
						res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
						res.redirect('/');
					}
				});
			}
	}

	this.home = (req,res,next) => {
		var user_session = req.session;
			var mainpage = 'home';
			res.render('page/index',{user_session,mainpage});
	}
}

module.exports = new Constructor();