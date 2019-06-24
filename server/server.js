//const redis = require('redis')
const mongoose = require('mongoose');
const express = require('express')
var multer  = require('multer');
var fs = require('fs')

const User = require('../db/user.js')
const ContactForm = require('../db/contactForm')
const ContactCategory = require('../db/Contactcategory.js')

let api = require("../api/api");

var app = express()
var bodyParser = require('body-parser')
var server = require('http').Server(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// let client = redis.createClient();
// client.on('connect', ()=>{
//     console.log("Redis Connected")
// })
mongoose.connect('mongodb://contact:contact123@ds337377.mlab.com:37377/contact',  (err) => {
   if (err) throw err;
   console.log('Mongoose connected');
 
});

api(app)


app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
})


// var user = new User({
//     Name: 'Nitin',
//     Password: 'nitin@123'
// })
// user.save()

const storage = multer.diskStorage({
  destination:function(req, file, cb){
    cb(null, './uploads');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname )
  }
})
const upload = multer({ storage: storage }).array('SelectedImage')

app.post('/upload', (req, res) => {
  console.log("req.body.type = >",req.body.type)
  upload(req, res, function (err) {
    //console.log(req.file)
    res.send("done")
  })
})

app.post('/saveContact', (req, res) => {
  let Transaction_Number = req.body.Transaction_Number 
  let Name = req.body.Name
  let Email = req.body.Email
  let Subject = req.body.Subject
  let Message = req.body.Message
  let date = req.body.date
  let Case_No = req.body.Case_No
  let Document = req.body.Document
  let Image = fs.readFileSync(req.body.Image)
  let Link = req.body.Link

  var contactForm = new ContactForm ({
    Transaction_Number : Transaction_Number,
     Name : Name,
     Email : Email,
     Subject : Subject,
     Message : Message,
     date : date,
     Case_No : Case_No,
     Document: Document,
     Image: Image,
     Link: Link
  })
  contactForm.save()
  res.send("saved")
})


app.get('/findcontact', (req, res) => {
ContactCategory.find({}, function (err, docs) {
  if (err) {
    console.log("error")
    res.send(err)
  } else {
    console.log(docs)
    res.send(docs)
  }
})
})

// app.post('/savecontact', (req, res) => {
// let user_Id = req.body.user_Id
// let Name = req.body.Name
// let Reason = req.body.Reason
// let Message = req.body.Message
// let date = req.body.date

// var contact = new Contact({
//     user_Id: user_Id,
//     Name: Name,
//     Reason: Reason,
//     Message: Message,
//     Date: date
// })
// contact.save((err, data)=>{
//     if(err){
//       console.log(err)
//       res.send(err)
//     }else{
//       console.log(data)
//       res.send(data)
//     }
//   })
//   let redis_data ={
//     user_Id: user_Id,
//     Name: Name,
//     Reason: Reason,
//     Message: Message,
//     Date: date
//   }
//   client.rpush('RedisContact', JSON.stringify(redis_data))
// })

app.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    User.find({ Name: username, Password: password }, function (err, docs) {
      if (err) {
        console.log("error")
        res.send("error")
      } else {
        console.log(true)
        res.send({check:true, data:docs})
      }
    })
  })

  

server.listen(7777, () => {
    console.log("server connected")
})
