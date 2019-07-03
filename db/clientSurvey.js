var mongoose = require('mongoose');

var ClientSurvey = new mongoose.Schema({
    Question: String,
    Options: []
})

module.exports = mongoose.model('ClientSurvey', ClientSurvey)
