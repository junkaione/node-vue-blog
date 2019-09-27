const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  addTime: { type: Date, required: true, default: new Date() },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  updatedTime: { type: Date, required: true, default: new Date() },
  commentNum: { type: Number, required: true, default: 0 },
  viewNum: { type: Number, required: true, default: 0 }
})

const articleModel = mongoose.model('article', articleSchema)

module.exports = articleModel