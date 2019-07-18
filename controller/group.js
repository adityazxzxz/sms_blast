const db = require('../db/database');

function Constructor() {
	this.get = async (req, res, next) => {
		var user_session = req.session;
		var mainpage = 'group_input';
		
		let group = await db.Group.findAll().catch(err => console.log(err));
		res.render('page/index', { user_session, mainpage, group });
    }
    
	this.save = async (req, res, next) => {
		var group = req.body.name;
		var source = req.body.source;
		if (group && source) {
			let query = await db.Group.findOrCreate({
				where:{
					name:group.trim(),
					source:source.trim()
				},
				defaults:{
					name:group.trim(),
					source:source.trim()
				}
			}).then(([data,isCreated]) => {
				console.log(isCreated);
				if(isCreated){ //jika berhasil create
					return res.json({error:false,message:'Insert Group succeed!'});
				}else{
					return res.json({error:true,message:'Group already exist!'});
				}
			}).catch(err => {
				console.log(err);
				return res.json({error:true,message:'Something wrong'});
			});
		} else {
			return res.json({ error: true, message: 'Fill text box' });
		}

	}
}

module.exports = new Constructor();