const fs = require('fs');
const path = require('path');
const router = require('koa-router')()

module.exports.GetModols = function (Sequelize, sequlize, models) {
    fs.readdirSync(path.join(__dirname, 'models')).forEach((filename) => {
        require(`./models/${filename}`)(Sequelize, sequlize, models);
    })
}

module.exports.GetRoute = function (opts, sequelize) {
    fs.readdirSync(path.join(__dirname, 'routes')).forEach((filename) => {
        require(`./routes/${filename}`)(router, opts, sequelize);
    })
    return router;
}