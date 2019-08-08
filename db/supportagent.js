var mongoose = require('mongoose')

var SupportAgent = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  Password: String,
  TicketId: String,
  Type: []
})
module.exports = mongoose.model('SupportAgent', SupportAgent)
