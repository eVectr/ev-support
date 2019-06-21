var mongoose = require('mongoose');

var Image = new mongoose.Schema({
    Image: { data: Buffer, contentType: String }
    
})

module.exports = mongoose.model('Image',Image)