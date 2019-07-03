var mongoose = require('mongoose');

var TransactionSurvey = new mongoose.Schema({
    Question: String,
    Options: []
})

module.exports = mongoose.model('TransactionSurvey', TransactionSurvey)
