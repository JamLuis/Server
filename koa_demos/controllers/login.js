var aesjs = require("aes-js");
const Joi = require("joi");
var jwt = require("jsonwebtoken");
const moment = require("moment");
var svgCaptcha = require('svg-captcha');

exports.LoginFn = (opt) => {
  return async function (ctx, next) {
    const { userName, password } = ctx.request.body;
    const { user } = opt.sequelize.models;
    // const transaction = await ctx.db.transaction();
    let message = "登陆成功",
      state = 200;
    try {
      const rslt = await user.findOne({ where: { userName, password } });
      if (!rslt) {
        message = "密码或账户不正确";
        state = 400;
      }
      const token = await createToken(ctx, rslt);
      ctx.response.state = state;
      ctx.response.body = {
        success: true,
        data: { token },
        message,
      };
    } catch (error) {
      ctx.response.state = 500;
      ctx.response.body = {
        success: false,
        data: null,
        error,
        message: "登陆失败",
      };
    }
  };
};
const PRIMARYKEY = "LOAGIN_TOKEN_KEY";
const algorithm = { expiresIn: "3h" };
async function createToken(ctx, user) {
  const transaction = await ctx.db.transaction();
  const { user_token } = ctx.db.models;
  try {
    // 清空历史token
    await user_token.destroy({
      where: {
        user_id: user.id,
      },
      transaction: transaction,
    });
    // 根据用户信息生成token
    const token = jwt.sign(
      { data: JSON.stringify(user) },
      PRIMARYKEY,
      algorithm
    );
    // 插入新的token
    await user_token.create(
      { token, user_id: user.id },
      { transaction: transaction }
    );
    await transaction.commit();
    // const decode = jwt.verify(token, PRIMARYKEY);
    // moment(decode.exp *1000).format('YYYY-MM-DD HH:mm:ss')
    return token;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

exports.LoginOutFn = (opt) => {
  return async function (ctx, next) {
    const { userId } = ctx.request.body;
    let error = {};
    try {
      const { user_token } = ctx.db.models;
      if (userId) {
        // 清空历史token
        await user_token.destroy({
          where: {
            user_id: userId
          },
        });
        error = null;
      }

      if (error) {
        ctx.response.state = 500;
        ctx.response.body = {
          success: false,
          data: null,
          message: "登出失败,请携带userId",
        };
      } else {
        ctx.response.state = 200;
        ctx.response.body = {
          success: true,
          data: null,
          message: "登出成功",
        };
      }

    } catch (err) {
      console.log(err)
      ctx.response.state = 500;
      ctx.response.body = {
        success: false,
        data: null,
        error: JSON.stringify(err),
        message: "登出失败",
      };
    }
  };
};

exports.generateSvgCaptcha = (opt) => {
  return async function (ctx, next) {
    try {
      // 实在写不去了，太痛苦了
    } catch (err) {

    }
  }
}

exports.CreateUser = (opt) => {
  return async function (ctx, next) {
    const userSource = ctx.request.body;
    const result = userSchema.validate(userSource);
    if (result.error) {
      ctx.response.body = {
        success: false,
        data: null,
        message: result.error,
      };
      return;
    }
    const { user } = opt.sequelize.models;

    var data = await user.create(userSource);
    ctx.response.body = {
      success: true,
      data: null,
      message: "新增用户成功",
    };
  };
};

exports.FindUser = (opt) => {
  return async function (ctx, next) {
    const { user } = opt.sequelize.models;
    var data = await user.findAll();
    ctx.response.body = data;
  };
};
const userSchema = Joi.object({
  userName: Joi.string().required(),
  phone: Joi.number(),
  gender: Joi.string().required(),
  birthday: Joi.date(),
  password: Joi.string().required(),
  email: Joi.string().email(),
});
