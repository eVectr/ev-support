var mongoose = require('mongoose');

var ContactForm = new mongoose.Schema({
    Transaction_Number: String,
    Name: String,
    Email: String,
    Subject: String,
    Message: String,
    Document: String,
    Image:  String,
    Link: String,
    Date:Date,
    Case_No: String
});

module.exports = mongoose.model('ContactForm', ContactForm)