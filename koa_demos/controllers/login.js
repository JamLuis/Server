
exports.LoginFn = (opt) => {
    return async function (ctx, next) {
        const { name } = ctx.params;
        ctx.response.body = `<h1>${name}</h1><h2>You hava Login in</h2>`

    }
}
exports.LoginOutFn = (opt) => {
    return async function (ctx, next) {
        const { name } = ctx.params;
        ctx.response.body = `<h2>You hava Login out</h2>`
    }
}

exports.CreateUser = (opt) => {
    return async function (ctx, next) {
        const { name, age } = ctx.params;
        const { user } = opt.sequelize.models;
        var data = await user.create({
            name: name,
            age: age,
            created_at: Date.now()
        });
        ctx.response.body = data.dataValues;
    }
}

exports.FindUser = (opt) => {
    return async function (ctx, next) {
        const {user} = opt.sequelize.models;
        var data = await user.findAll();
        ctx.response.body = data;
    }
}