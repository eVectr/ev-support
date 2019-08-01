var mongoose = require('mongoose')

var UserMessage = new mongoose.Schema({
  Id: String,
  SenderId: String,
  SenderName: String,
  ReceiverId: String,
  ReceiverName: String,
  Message: String,
  Date: Date
})
module.exports = mongoose.model('UserMessage', UserMessage)
