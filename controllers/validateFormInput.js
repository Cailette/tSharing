exports.validateCreateForm =  function(req, res, next)  {
    req.checkBody('bName', 'Board name must be between 2-15 characters long.').len(2, 15);
    req.checkBody('bName', 'Board name can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('bPassword', 'Board password can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('bPassword', 'Board password must be between 6-20 characters long.').len(6, 20);
    req.checkBody('bPasswordMatch', 'Board passwords do not match, please try again.').equals(req.body.bPassword);

    req.checkBody('uName', 'Username must be between 2-15 characters long.').len(2, 15);
    req.checkBody('uName', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('uPassword', 'User passwords must be between 6-20 characters long.').len(6, 20);
    req.checkBody('uPassword', 'User passwords can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('uPasswordMatch', 'User passwords do not match, please try again.').equals(req.body.uPassword);

    var errors = req.validationErrors();
    if(errors) res.render('create', { msg: errors });
    next();
};

exports.validateJoinForm =  function(req, res, next)  {
    req.checkBody('uName', 'Username must be between 2-15 characters long.').len(2, 15);
    req.checkBody('uName', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('uPassword', 'User passwords must be between 6-20 characters long.').len(6, 20);
    req.checkBody('uPassword', 'User passwords can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('uPasswordMatch', 'User passwords do not match, please try again.').equals(req.body.uPassword);
 
    var errors = req.validationErrors();
    if(errors) res.render('create', { msg: errors });
    next();
};