var mongoose = require('mongoose')

var Notification = new mongoose.Schema({
  Type: String,
  Message: String,
  Counter: Number,
  Date: Date,
  SentBy: String
})

module.exports = mongoose.model('Notification', Notification)
