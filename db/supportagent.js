var mongoose = require('mongoose')

var SupportAgent = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  Password: String,
  TicketId: [],
  Type: []
})
module.exports = mongoose.model('SupportAgent', SupportAgent)
