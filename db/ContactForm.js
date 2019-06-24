var mongoose = require('mongoose');

var ContactForm = new mongoose.Schema({
    Transaction_Number: String,
    Name: String,
    Email: String,
    Subject: String,
    Message: String,
    Case_No: String,
    Document: Array,
    Image:  Array,
    Link: Array,
    Date:Date,
});

module.exports = mongoose.model('ContactForm', ContactForm)