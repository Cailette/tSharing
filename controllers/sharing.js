var join = module.exports = {

	get: function(req, res, next) {
		res.redirect('/sharing/yourTasks') 
	},

	yourTasks: function(req, res, next) {
		res.render('sharing');   
	},

	logout: function(req, res, next) {
		req.logout();
		req.session.destroy();
		res.redirect('/'); 
	},

}