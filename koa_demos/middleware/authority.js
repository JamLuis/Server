var jwt = require("jsonwebtoken");
const moment = require("moment");
const PRIMARYKEY = "LOAGIN_TOKEN_KEY";

async function authorityCheck(ctx, next) {
  try {
    if (ctx.path.indexOf("login") == -1) {
      const { authorization } = ctx.request.headers;
      if (authorization) {
        const { user_token } = ctx.db.models;
        const token = await user_token.findOne({
          where: { token: authorization },
        });
        if (!token) {
          ctx.response.body = {
            success: false,
            data: null,
            message: "请先登陆",
          };
          return;
        }
        const decode = jwt.verify(authorization, PRIMARYKEY);

        if (decode.exp * 1000 > moment().valueOf()) {
          await next();
        } else {
          ctx.response.body = {
            success: false,
            data: null,
            message: "token过期请重新登陆",
          };
          return;
        }
      } else {
        ctx.response.body = {
          success: false,
          data: null,
          message: "请先登陆",
        };
        return;
      }
    } else {
      await next();
    }
  } catch (error) {
    ctx.response.body = {
      success: false,
      data: null,
      message: "请求失败",
      error: JSON.stringify(error),
    };
  }
}

module.exports = {
  authorityCheck,
};
