var mongoose = require('mongoose')

var UserMessage = new mongoose.Schema({
  SenderName: String,
  ReceiverName: String,
  Message: String
})

module.exports = mongoose.model('UserMessage', UserMessage)
