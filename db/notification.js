var mongoose = require('mongoose')

var Notification = new mongoose.Schema({
  Type: String,
  Date: Date,
  SentTo: [],
  SentBy: String,
  Action: String,
  FontStyle: Boolean
})

module.exports = mongoose.model('Notification', Notification)
