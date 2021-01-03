const fs = require('fs');
const path = require('path');

module.exports = function (app, router, opts) {
    fs.readdirSync(__dirname).map(dirName => {
        if (fs.lstatSync(path.join(__dirname, dirName)).isDirectory()) {
            fs.readdirSync(path.join(__dirname, dirName)).map(api => {
                require(`./${dirName}/${api}`)(app, router, opts);
            })
        }
    })
    return router;
}
