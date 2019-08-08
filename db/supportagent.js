var mongoose = require('mongoose')

var SupportAgent = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  Password: String,
  Type: String
})
module.exports = mongoose.model('SupportAgent', SupportAgent)
