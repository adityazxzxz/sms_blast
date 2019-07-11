var conf = require('./config/config.js');
var db = require('./db/database');
var fs = require('fs');
var multer = require('multer');
var csvParser = require('csv-parser');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');

var fileupload = require('express-fileupload');
var helmet = require('helmet');


var app = express();

app.set('view engine','ejs');
app.set('views','views');
app.use(express.static('public'));
app.use(logger(':method :url :status :res[content-length] - :response-time ms :remote-addr :date[clf]' ));
app.use(session({
	secret: 'aqn123',
	resave: true,
	saveUninitialized: true
}));

app.use(express.static(path.join(__dirname,'public')));

console.log(path.join(__dirname,'public'));
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
})
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(helmet());

const router = require('./router/router');
router.configure(app);

/*app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/input', function(request, response) {
	response.sendFile(path.join(__dirname + '/upload.html'));
});

app.post('/sendsms', function(request, response) {
	var message = request.body.message;
	var key = request.body.key;
	if(key !== 'aqn123!!'){
		console.log('key not match');
		return response.json({error:true,'message':'Key not match'});
	}
	db.acquire((err,con) => {
		if(err) throw err;
		con.query("select * from p_msisdn limit 1",(err,data) => {
			if(err)
				console.log('Error ',err);
			if(data && data.length){
				con.query('SELECT * FROM p_msisdn',(err,dataraw) => {
					con.release();
					if(err) throw err;
					con.query("INSERT INTO p_sms_content (content) values (?)",[message],(err,datainsert) => {
						if(err) throw err;
						console.log(datainsert.insertId);
						dataraw.forEach(function(datauser){
							con.query('INSERT INTO p_logs (content_id,msisdn) values(?,?)',[datainsert.insertId,datauser.msisdn],(err,data) => {
								if(err) throw err;
								console.log('p_logs ',datauser.msisdn);
								axios.get('https://httpsmsc.montymobile.com/HTTP/api/Client/SendSMS',{
									params:{
										username:'asiaqarg',
										password:'aS!aRg22',
										destination:datauser.msisdn,
										source:'MM1',
										text:message,
										dataCoding:0
									}
								}).then((res) => {
									var status = (res.data.ErrorCode === 0) ? 'success' : 'fail';
									con.query('UPDATE p_logs set status=?,response=? where id=?',[status,JSON.stringify(res.data),data.insertId],(err,data) => {
										if(err) throw err;	
									});
								})
								.catch((errorr) => {
									console.log(errorr);
								});
							});
							
						});
					});
				});
				return response.json({error:false,'message':'Success'});
			}else{
				return response.json({error:true,'message':'Msisdn not found'});
			}
		});
	});
});

app.post('/do_upload',function(request,response){
	var msisdn = request.body.msisdn;
	if(msisdn.length > 0){
		db.acquire((err,con) => {
			if(err) throw err;
			con.query('INSERT IGNORE INTO p_msisdn(group_id,msisdn) values(?,?)',['1',msisdn],(err,data) => {
				if(err) return response.json({'error':true,'message':'something wrong'});

				return response.json({'error':false,'message':'Success'});
			});
		});
	}else{
		return response.json({'error':true,'message':'Fill the text box!'});
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});*/

module.exports = app;