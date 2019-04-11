var sharing = module.exports = {

	get: function(req, res, next) {
		res.redirect('/sharing/allTasks') 
	},

	start: function(req, res, next) {
		res.redirect('/') 
	},

	logout: function(req, res, next) {
		req.logout();
		req.session.destroy();
		res.redirect('/'); 
	},
}