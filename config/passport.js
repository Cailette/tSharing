module.exports = function(passport) {
    passport.serializeUser(function(USER_ID, done)
    {
        done(null, USER_ID);
    });
    
    passport.deserializeUser(function(USER_ID, done)
    {
        done(null, USER_ID);
    });
}