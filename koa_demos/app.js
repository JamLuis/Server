const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const Sequelize = require("sequelize");
const config = require("./config");
const appPrepare = require("./utils");
const Analysis = require("./utils/analysis");
const { authorityCheck } = require("./middleware/authority");
const { logInfo, logger } = require("./middleware/log4j");

let models = {};
let sequelize = new Sequelize(
  config.dataBase.database,
  config.dataBase.username,
  config.dataBase.password,
  config.dataBase.options
);
//模型层注入sequelize 等参数
appPrepare.GetModols(Sequelize, sequelize, models);

config.sequelize = sequelize;
// global.models = models;
let router = appPrepare.GetRoute(config);

const app = new Koa();
app.use(bodyParser());
//设置全局变量
app.context.db = sequelize;
app.context.log = logger;

//log
app.use(logInfo);
// token校验
app.use(authorityCheck);

//加载路由
app.use(router.routes());
//全局
app.use(router.allowedMethods());

app.listen("3000");
