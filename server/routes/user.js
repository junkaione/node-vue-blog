const router = require('koa-router')()
const userModel = require('../db/model/user')
const bcrypt = require('bcryptjs')
const { jwtSign } = require('../utils/jwt')

router.prefix('/user')

/**
 * @api {post} /user/reg 用户注册
 * @apiName /user/reg
 * @apiGroup User
 *
 * @apiParam {String} username (必填)用户名.
 * @apiParam {String} password (必填)密码.
 *
 * @apiSuccess {String} code code状态码.
 * @apiSuccess {String} msg  msg提示信息.
 */
router.post('/reg', async (ctx, next) => {
  let { username, password } = ctx.request.body;
  if (username && password) {
    try {
      password = bcrypt.hashSync(password, 10)
      let res = await userModel.create({ username, password })
      ctx.body = {
        code: '000000',
        msg: '注册成功'
      }
    } catch (e) {
      ctx.body = {
        code: '100001',
        msg: '系统错误',
        info: e
      }
    }
  } else {
    ctx.body = {
      code: '100002',
      msg: '参数错误'
    }
  }
})

/**
 * @api {post} /user/login 用户登录
 * @apiName /user/login
 * @apiGroup User
 *
 * @apiParam {String} username (必填)用户名.
 * @apiParam {String} password (必填)密码.
 *
 * @apiSuccess {String} code code状态码.
 * @apiSuccess {String} msg  msg提示信息.
 */
router.post('/login', async (ctx, next) => {
  let { username, password } = ctx.request.body;
  if (username && password) {
    try {
      let res = await userModel.find({ username })
      if (res.length) {
        let isPwdValid = bcrypt.compareSync(password, res[0].password)
        if (isPwdValid) {
          const token = jwtSign({
            _id: res[0]._id,
            username: res[0].username,
            type: res[0].type
          })
          ctx.body = {
            code: '000000',
            msg: '登录成功',
            data: {
              username: res[0].username,
              type: res[0].type,
              token
            }
          }
        } else {
          ctx.body = {
            code: '100004',
            msg: '密码错误'
          }
        }
      } else {
        ctx.body = {
          code: '100003',
          msg: '用户名不存在'
        }
      }
    } catch (e) {
      ctx.body = {
        code: '100001',
        msg: '系统错误',
        info: e
      }
    }
  } else {
    ctx.body = {
      code: '100002',
      msg: '参数错误'
    }
  }
})

module.exports = router