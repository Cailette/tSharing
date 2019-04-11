const userContoroller = require('./model/user');

exports.validateCreateForm =  function(req, res, next)  {
    req.checkBody('bName', 'Board name must be between 2-15 characters long.').len(2, 15);
    req.checkBody('bName', 'Board name can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('bPassword', 'Board password can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('bPassword', 'Board password must be between 6-20 characters long.').len(6, 20);
    req.checkBody('bPasswordMatch', 'Board passwords do not match.').equals(req.body.bPassword);

    req.checkBody('uName', 'Username must be between 2-15 characters long.').len(2, 15);
    req.checkBody('uName', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('uPassword', 'User passwords must be between 6-20 characters long.').len(6, 20);
    req.checkBody('uPassword', 'User passwords can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('uPasswordMatch', 'User passwords do not match.').equals(req.body.uPassword);

    const errors = req.validationErrors();
    if(errors) {
        res.render('create', { msg: errors });
    } else {
        next();
    }
};

exports.validateJoinForm =  function(req, res, next)  {
    req.checkBody('uName', 'Username must be between 2-15 characters long.').len(2, 15);
    req.checkBody('uName', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('uPassword', 'User passwords must be between 6-20 characters long.').len(6, 20);
    req.checkBody('uPassword', 'User passwords can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('uPasswordMatch', 'User passwords do not match.').equals(req.body.uPassword);
 
    const errors = req.validationErrors();
    if(errors) {
        res.render('create', { msg: errors });
    } else {
        next();
    }
};

exports.validateEditForm = async function(req, res, next)  {
    req.checkBody('uName', 'Username must be between 2-15 characters long.').len(2, 15);
    req.checkBody('uName', 'Username field can not be empty.').notEmpty();
    req.checkBody('uName', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    if(req.body.uPassword) {
        req.checkBody('uPassword', 'User passwords must be between 6-20 characters long.').len(6, 20);
        req.checkBody('uPassword', 'User passwords can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    }
    req.checkBody('uPasswordMatch', 'User passwords do not match.').equals(req.body.uPassword);
    if(req.body.uPassword || req.body.uPasswordMatch) {
        req.checkBody('oldPassword', 'Old password field can not be empty.').notEmpty();
    }
 
    const errors = req.validationErrors();
    if(errors){
        const user = await userContoroller.getById(req.session.USER_ID);
        res.render('sharing', { page: 'editAccount', user: user, msg: errors });
    } else {
        next();
    }
};

exports.validateTaskForm = async function(req, res, next)  {
    req.checkBody('tTitle', 'Topic field can not be empty.').notEmpty();
    req.checkBody('tTitle', 'Topic must be between 1-45 characters long.').len(1, 45);
    req.checkBody('tComment', 'Comment must be between 0-500 characters long.').len(0, 500);
    
    const errors = req.validationErrors();
    if(errors){
        res.render('sharing', { page: 'allTasks' }); 
    } else {
        next();
    }
};