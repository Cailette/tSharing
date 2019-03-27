exports.sharingGet = function(req, res, next) {
	res.redirect('/sharing/yourTasks') 
};

exports.yourTasks = function(req, res, next) {
	res.render('sharing');   
};

exports.logout = function(req, res, next) {
	req.logout();
	req.session.destroy();
    res.redirect('/'); 
};