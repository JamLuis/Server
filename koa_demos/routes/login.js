
var login = require('../controllers/login');

// router.get('/login/:name', login.LoginFn());
// router.get('/logout', login.LoginOutFn());

module.exports = function (router, opt) {
    router.post('/api/login', login.LoginFn(opt));
    router.post('/api/logout', login.LoginOutFn(opt));
    router.post('/api/create/user', login.CreateUser(opt));
    router.get('/api/find/user', login.FindUser(opt));
    router.post('/api/query/verification/code', login.generateVerificationCode);
    router.get('/api/check/token', login.checkToken);
};
