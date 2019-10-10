const router = require('koa-router')()
const articleModel = require('../db/model/article')
const { jwtCheck } = require('../utils/jwt')

router.prefix('/article')

/**
 * @api {post} /article/add 新增文章
 * @apiName /article/add
 * @apiGroup Article
 *
 * @apiParam {String} title (必填)文章标题.
 * @apiParam {String} content (必填)文章内容.
 * @apiParam {String} category (必填)分类id.
 *
 * @apiSuccess {String} code code状态码.
 * @apiSuccess {String} msg  msg提示信息.
 */
router.post('/add', jwtCheck, async (ctx) => {
  if (ctx.request.jwtInfo.type === 1) {
    const { title, content, category } = ctx.request.body
    if (title && content && category) {
      try {
        let res = await articleModel.create({
          title,
          content,
          author: ctx.request.jwtInfo._id,
          category
        })
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
  } else {
    ctx.body = {
      code: '999998',
      msg: '权限不足'
    }
  }
})

/**
 * @api {get} /article/page 查询文章
 * @apiName /article/page
 * @apiGroup Article
 *
 * @apiParam {String} _id 文章id.
 * @apiParam {String} title 文章标题.
 * @apiParam {String} content 文章内容.
 * @apiParam {String} category 分类ID.
 * @apiParam {Number} pageSize 每页条数,默认5条.
 * @apiParam {Number} currentPage 当前页数,默认第1页.
 *
 * @apiSuccess {String} code code状态码.
 * @apiSuccess {String} msg  msg提示信息.
 */
router.get('/page', async (ctx) => {
  const { _id, title, content, category } = ctx.request.query
  const pageSize = Number(ctx.request.query.pageSize) || 5
  const currentPage = Number(ctx.request.query.currentPage) || 1
  let findInfo = {
    title: { $regex: new RegExp(title) },
    content: { $regex: new RegExp(content) }
  }
  if (category) {
    findInfo.category = category
  }
  try {
    if (_id) {
      findInfo._id = _id
      await articleModel.updateOne({ _id }, { $inc: { viewNum: 1 } })
      let res = await articleModel.findOne(findInfo).populate('author', 'username').populate('category', 'name')
      ctx.body = {
        code: '000000',
        msg: '查询成功',
        data: res
      }
    } else {
      let res = await articleModel.find(findInfo, '-content').populate('author', 'username').populate('category', 'name').limit(pageSize).skip((currentPage - 1) * pageSize)
      let total = await articleModel.countDocuments(findInfo)
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

/**
 * @api {post} /article/update 修改文章
 * @apiName /article/update
 * @apiGroup Article
 *
 * @apiParam {String} _id (必填)文章id.
 * @apiParam {String} title 文章标题.
 * @apiParam {String} content 文章内容.
 * @apiParam {String} category 分类ID.
 *
 * @apiSuccess {String} code code状态码.
 * @apiSuccess {String} msg  msg提示信息.
 */
router.post('/update', jwtCheck, async (ctx) => {
  if (ctx.request.jwtInfo.type === 1) {
    const { _id, title, content, category } = ctx.request.body
    if (_id && (title || content || category)) {
      let updateInfo = { updatedTime: new Date() }
      if (title) {
        updateInfo.title = title
      }
      if (content) {
        updateInfo.content = content
      }
      if (category) {
        updateInfo.category = category
      }
      try {
        let res = await articleModel.updateOne({ _id }, updateInfo)
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
        code: '100002',
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

/**
 * @api {post} /article/del 删除文章
 * @apiName /article/del
 * @apiGroup Article
 *
 * @apiParam {String} _id (必填)文章id.
 *
 * @apiSuccess {String} code code状态码.
 * @apiSuccess {String} msg  msg提示信息.
 */
router.post('/del', jwtCheck, async (ctx) => {
  if (ctx.request.jwtInfo.type === 1) {
    const { _id } = ctx.request.body
    if (_id) {
      try {
        let res = await articleModel.remove({ _id })
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
        code: '100002',
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