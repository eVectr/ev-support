var mongoose = require('mongoose');

var Messagelogs = new mongoose.Schema({
    ID:String,
    Message:String,
    Type:String
})
module.exports = mongoose.model('Messagelogs', Messagelogs)
