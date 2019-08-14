var mongoose = require('mongoose')

var SupportAgent = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  Password: String,
  Email: String,
  TicketId: [],
  Type: [],
  Date:Date
})
module.exports = mongoose.model('SupportAgent', SupportAgent)
