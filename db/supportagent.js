var mongoose = require('mongoose');

var SupportAgent = new mongoose.Schema({
    Name:String,
    Password:String,
    Email:String
})
module.exports = mongoose.model('SupportAgent', SupportAgent)
