
var login = require('../controllers/login');

// router.get('/login/:name', login.LoginFn());
// router.get('/logout', login.LoginOutFn());

module.exports = function (router, opt) {
    router.post('/login', login.LoginFn(opt));
    router.post('/logout', login.LoginOutFn(opt));
    router.post('/create/user', login.CreateUser(opt));
    router.get('/find/user', login.FindUser(opt));
};
