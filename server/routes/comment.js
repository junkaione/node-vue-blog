const router = require('koa-router')()
const commentModel = require('../db/model/comment')
const { jwtCheck } = require('../utils/jwt')

router.prefix('/comment')

router.post('/add', jwtCheck, async (ctx) => {
  const { article, comment } = ctx.request.body
  if (article && comment) {
    try {
      let res = commentModel.create({ article, comment, user: ctx.request.jwtInfo._id })
      ctx.body = {
        code: '000000',
        msg: '新增成功'
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

router.get('/page', async (ctx) => {
  const { _id, article, user } = ctx.request.query
  const pageSize = Number(ctx.request.query.pageSize) || 5
  const currentPage = Number(ctx.request.query.currentPage) || 1
  let findInfo = {}
  if (article) {
    findInfo.article = article
  }
  if (user) {
    findInfo.article = user
  }
  try {
    if (_id) {
      findInfo._id = _id
      let res = await commentModel.findOne(findInfo).populate('article', 'title').populate('user', 'username')
      ctx.body = {
        code: '000000',
        msg: '查询成功',
        data: res
      }
    } else {
      let res = await commentModel.find(findInfo).populate('article', 'title').populate('user', 'username').limit(pageSize).skip((currentPage - 1) * pageSize)
      let total = await commentModel.countDocuments(findInfo)
      ctx.body = {
        code: '000000',
        msg: '查询成功',
        data: {
          result: res,
          pageSize,
          currentPage,
          total,
        }
      }
    }
  } catch (e) {
    ctx.body = {
      code: '100001',
      msg: '系统错误',
      info: e
    }
  }
})

router.post('/update', jwtCheck, async (ctx) => {
  if (ctx.request.jwtInfo.type === 1) {
    const { _id, article, user, comment } = ctx.request.body
    if (_id && (article || user || comment)) {
      let updateInfo = { updatedTime: new Date() }
      if (article) {
        updateInfo.article = article
      }
      if (user) {
        updateInfo.user = user
      }
      if (comment) {
        updateInfo.comment = comment
      }
      try {
        let res = await commentModel.updateOne({ _id }, updateInfo)
        ctx.body = {
          code: '000000',
          msg: '修改成功'
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
        code: '100001',
        msg: '参数错误'
      }
    }
  } else {
    ctx.body = {
      code: '999998',
      msg: '权限不足'
    }
  }
})

router.post('/del', jwtCheck, async (ctx) => {
  if (ctx.request.jwtInfo.type === 1) {
    const { _id } = ctx.request.body
    if (_id) {
      try {
        let res = await commentModel.deleteOne({ _id })
        ctx.body = {
          code: '000000',
          msg: '删除成功'
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
        code: '100001',
        msg: '参数错误'
      }
    }
  } else {
    ctx.body = {
      code: '999998',
      msg: '权限不足'
    }
  }
})

module.exports = router