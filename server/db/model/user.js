const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: Number, required: true, default: 2,  /* 1超级管理员，2普通用户 */ }
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel