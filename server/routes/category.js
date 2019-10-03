const router = require('koa-router')()
const categoryModel = require('../db/model/category')
const { jwtCheck } = require('../utils/jwt')

router.prefix('/category')

/**
 * @api {post} /category/add 新增分类
 * @apiName /category/add
 * @apiGroup Category
 *
 * @apiParam {String} name (必填)分类名称.
 *
 * @apiSuccess {String} code code状态码.
 * @apiSuccess {String} msg  msg提示信息.
 */
router.post('/add', jwtCheck, async (ctx) => {
  const { name } = ctx.request.body
  if (name) {
    try {
      let res = await categoryModel.create({ name })
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

/**
 * @api {get} /category/list 分类列表
 * @apiName /category/list
 * @apiGroup Category
 *
 *
 * @apiSuccess {String} code code状态码.
 * @apiSuccess {String} msg  msg提示信息.
 */
router.get('/list', jwtCheck, async (ctx) => {
  try {
    let res = await categoryModel.find()
    ctx.body = ({
      code: '000000',
      msg: '查询成功',
      data: res
    })
  } catch (e) {
    ctx.body = ({
      code: '100001',
      msg: '系统错误',
      info: e
    })
  }
})

/**
 * @api {post} /category/update 修改分类
 * @apiName /category/update
 * @apiGroup Category
 *
 * @apiParam {String} _id (必填)分类_id
 * @apiParam {String} name (必填)分类名称.
 *
 * @apiSuccess {String} code code状态码.
 * @apiSuccess {String} msg  msg提示信息.
 */
router.post('/update', jwtCheck, async (ctx) => {
  const { _id, name } = ctx.request.body
  if (_id && name) {
    try {
      let res = await categoryModel.updateOne({ _id }, { name })
      ctx.body = {
        code: '000000',
        msg: '修改成功'
      }
    } catch (e) {
      ctx.body = ({
        code: '100001',
        msg: '系统错误',
        info: e
      })
    }
  } else {
    ctx.body = {
      code: '100002',
      msg: '参数错误'
    }
  }
})

/**
 * @api {post} /category/del 删除分类
 * @apiName /category/del
 * @apiGroup Category
 *
 * @apiParam {String} _id (必填)分类_id
 *
 * @apiSuccess {String} code code状态码.
 * @apiSuccess {String} msg  msg提示信息.
 */
router.post('/del', jwtCheck, async (ctx) => {
  const { _id } = ctx.request.body
  if (_id) {
    try {
      let res = await categoryModel.deleteOne({ _id })
      ctx.body = {
        code: '000000',
        msg: '删除成功'
      }
    } catch (e) {
      ctx.body = {
        code: '100002',
        msg: '参数错误'
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