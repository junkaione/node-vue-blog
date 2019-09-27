const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/node-vue-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

mongoose.connection.on('open', () => {
    console.log('数据库连接成功');
})

mongoose.connection.on('error', () => {
    console.log('数据库连接失败');
})

module.exports = mongoose