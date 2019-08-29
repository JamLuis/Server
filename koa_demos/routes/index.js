
var login = require('../controllers/login');

// router.get('/login/:name', login.LoginFn());
// router.get('/logout', login.LoginOutFn());

module.exports = function (router, opt) {
    router.get('/login/:name', login.LoginFn(opt));
    router.get('/logout', login.LoginOutFn(opt));
    router.get('/create/user/:name/:age', login.CreateUser(opt));
    router.get('/find/user', login.FindUser(opt));
};
