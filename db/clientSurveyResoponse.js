var mongoose = require('mongoose');

var ClientSurveyResponse = new mongoose.Schema({
   UserId:string,
   QuestionId : string
})

module.exports = mongoose.model('ClientSurveyResponse', ClientSurveyResponse)
