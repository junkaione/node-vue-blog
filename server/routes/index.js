const router = require('koa-router')()
const { jwtCheck } = require('../utils/jwt')
const upload = require('../utils/upload')

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello Koa'
})

router.post('/upload', jwtCheck, upload.single('file'), async (ctx) => {
  const { filename } = ctx.req.file
  let src = `http://localhost:3000/uploads/${filename}`
  ctx.body = {
    code: '000000',
    msg: '上传成功',
    data: {
      src
    }
  }
})

module.exports = router