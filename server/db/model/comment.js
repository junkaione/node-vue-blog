const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'article', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  comment: { type: String, required: true },
  updatedTime: { type: Date, required: true, default: new Date() }
})

const commentModel = mongoose.model('comment', commentSchema)

module.exports = commentModel