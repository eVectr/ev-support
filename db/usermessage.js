var mongoose = require('mongoose')

var UserMessage = new mongoose.Schema({
  SenderId: String,
  SenderName: String,
  ReceiverId: String,
  Message: String,
  Date: Date
})
module.exports = mongoose.model('UserMessage', UserMessage)
