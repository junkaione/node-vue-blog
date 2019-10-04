const multer = require('koa-multer')

let upload = multer({
  limits: {
    //限制文件大小10kb
    fileSize: 500 * 1024,
    //限制文件数量
    files: 1
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // if (file) {
      cb(null, './public/uploads/');
      // }
    },
    filename: function (req, file, cb) {
      // if (file) {
      var changedName = (new Date().getTime()) + '-' + file.originalname;
      cb(null, changedName);
      // }
    }
  }),
  fileFilter: function (req, file, cb) {
    // 限制文件上传类型，可上传png/jpg/jpeg/gif格式图片
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif') {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
});

module.exports = upload