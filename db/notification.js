var mongoose = require('mongoose')

var Notification = new mongoose.Schema({
  Type: String,
  Date: Date,
  SentTo: String,
  SentBy: String,
  Action: String,
  Checked: Boolean
})

module.exports = mongoose.model('Notification', Notification)