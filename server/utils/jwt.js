const jwt = require('jsonwebtoken')

const jwtKey = 'zhangjunkai'

const jwtSign = (data) => {
  const token = jwt.sign(data, jwtKey, { expiresIn: 60 * 60 })
  return token
}

const jwtCheck = async (ctx, next) => {
  const token = ctx.request.headers.token
  try {
    let res = await jwt.verify(token, jwtKey)
    ctx.request.jwtInfo = res
    return next()
  } catch (e) {
    ctx.body = {
      code: '999999',
      msg: 'token无效'
    }
  }
}

module.exports = { jwtSign, jwtCheck }