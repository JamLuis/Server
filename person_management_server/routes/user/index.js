
module.exports = function (app, router, opts) {

    router.get('/', function (ctx, next) {
        ctx.body = 'this is a users response!'
    })

    router.get('/bar', function (ctx, next) {
        ctx.body = 'this is a users/bar response/is not lastest'
    })
}