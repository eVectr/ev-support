var mongoose = require('mongoose')

var AdminMessage = new mongoose.Schema({
  SenderName: String,
  ReceiverName: [],
  Message: String
})
module.exports = mongoose.model('AdminMessage', AdminMessage)
