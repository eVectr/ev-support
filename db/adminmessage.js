var mongoose = require('mongoose')

var AdminMessage = new mongoose.Schema({
  SenderName: String,
  ReceiverId: [],
  Message: String,
  Urgent: Boolean,
  Date: Date
})
module.exports = mongoose.model('AdminMessage', AdminMessage)
