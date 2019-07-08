//const redis = require('redis')
const mongoose = require('mongoose');
const express = require('express')
var multer  = require('multer');
const nodemailer = require('nodemailer')
const path = require('path')
var fs = require('fs')

const User = require('../db/user.js')
const ContactForm = require('../db/ContactForm')
const ContactCategory = require('../db/contactcategory.js')
const ClientSurvey = require('../db/clientSurvey')
const TransactionSurvey = require('../db/TransactionSurvey')
const ClientSurveyResponse = require('../db/clientSurveyResoponse')
const TransactionSurveyResponse = require('../db/transactionSurveyResponse')
let api = require("../api/api")

var app = express()
var bodyParser = require('body-parser')
var server = require('http').Server(app)

app.use(express.static('uploads'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// let client = redis.createClient();
// client.on('connect', ()=>{
//     console.log("Redis database Connected")
// })
mongoose.connect('mongodb://contact:contact123@ds337377.mlab.com:37377/contact',  (err) => {
   if (err) throw err;
   console.log('Mongoose connected');
 
})
api(app)

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
})

// var user = new User({
//     Name: 'Rajat',
//     Password: 'rajat@123',
//     Type:'user'
// })
// user.save()

// let option1data = {
//   Option1Type: 'CheckBox',
//   OptionValue: ['YES', 'NO']
// }


// var transactionSurvey = new TransactionSurvey({
//   Question: 'f NO would you like to file a complaint?',
//   Option1:option1data
// })
// transactionSurvey.save()


app.post('/clientSurveyResponse', (req, res) => {
  let UserId = req.body.UserId
  let Question1Response = req.body.Question1Response
  let Question2Response= req.body.Question2Response
  let Question3Response = req.body.Question3Response
  let Question4Response= req.body.Question4Response

  var clientSurveyResponse = new ClientSurveyResponse({
    UserId: UserId,
    Question1Response: Question1Response,
    Question2Response: Question2Response,
    Question3Response: Question3Response,
    Question4Response: Question4Response
  })
  clientSurveyResponse.save((err, data)=>{
    if(err){
      console.log(err)
      res.send('err')
    }else{
      console.log("data    =>", data)
      res.send(data)
    }
  }) 
})

app.post('/transactionSurveyResponse', (req, res) => {
  let UserId = req.body.UserId
  let Question1Response = req.body.Question1Response
  let Question2Response= req.body.Question2Response
  let Question3Response = req.body.Question3Response
  let Question4Response= req.body.Question4Response
  let Name = req.body.Name
  let PromotionFeedback = req.body.PromotionFeedback
  let DirectFeedBack = req.body.DirectFeedBack

  var clientSurveyResponse = new ClientSurveyResponse({
    UserId: UserId,
    Question1Response: Question1Response,
    Question2Response: Question2Response,
    Question3Response: Question3Response,
    Question4Response: Question4Response,
    Question5Response: Question5Response,
    Question6Response: Question6Response,
    Name:Name,
    PromotionFeedback:PromotionFeedback,
    DirectFeedBack: DirectFeedBack
  })
  clientSurveyResponse.save((err, data)=>{
    if(err){
      console.log(err)
      res.send('err')
    }else{
      console.log("transaction response=>", data)
      res.send(data)
    }
  }) 
})

const storage = multer.diskStorage({
  destination:function(req, file, cb){
    cb(null, './uploads');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname )
  }
})
const upload = multer({ storage: storage }).array('SelectedImage')

let imagepaths = []
let filepaths = []

app.post('/upload', (req, res) => {
  upload(req, res, function (err) {
    let path = req.files.map((file, index) => {
      imagepaths.push(file.path)
    })
    console.log("req.file =>", req.files)
    res.send("done")
  })
})

app.post('/fileupload', (req, res) => {
  upload(req, res, function (err) {
    console.log("req.file ====>", req.file)
    let path = req.files.map((file, index) => {
      filepaths.push(file.path)
      console.log(filepaths)
    })
    console.log("req.file =>", req.files)
    res.send("done")
  })
})

app.post('/saveContact', (req, res) => {
  let UserId = req.body.UserId
  let Transaction_Number = req.body.Transaction_Number 
  let Name = req.body.Name
  let Email = req.body.Email
  let Subject = req.body.Subject
  let Message = req.body.Message
  let date = Date.now()
  let Case_No = req.body.Case_No
  let Document = filepaths
  let Image = imagepaths
  let Link = req.body.Link
  let Reason = req.body.Reason
  let  Template = req.body.Template

  var contactForm = new ContactForm ({
    UserId:UserId,
    Transaction_Number : Transaction_Number,
     Name : Name,
     Email : Email,
     Subject : Subject,
     Message : Message,
     date : date,
     Case_No : Case_No,
     Document: Document,
     Image: Image,
     Link: Link,
     Status:'Open',
     Reason:Reason,
     Template: Template
  })
  contactForm.save((err, data)=>{
    if(err){
      console.log("err =>", err)
      console.log("data =>", data )
    }else{
      imagepaths.splice(0,imagepaths.length)
      filepaths.splice(0,imagepaths.length)
    }
  })
  console.log("contact saved")
  imagepaths.splice(0,imagepaths.length)
  filepaths.splice(0,imagepaths.length)
  res.send("saved")
})


app.get('/findcontact', (req, res) => {
  ContactCategory.find({}, function (err, docs) {
    if (err) {
      console.log("error")
      res.send(err)
    } else {
      res.send(docs)
    }
  })
})

app.get('/getclientsurvey', (req, res) => {
  ClientSurvey.find({}, function (err, docs) {
    if (err) {
      console.log("error")
      res.send(err)
    } else {
      console.log(" client survey ==>", docs)
      res.send(docs)
    }
  })
})

app.get('/gettransactionsurvey', (req, res) => {
  TransactionSurvey.find({}, function (err, docs) {
    if (err) {
      console.log("error")
      res.send(err)
    } else {
      console.log(" client survey ==>", docs)
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
        if(docs.length > 0){
          console.log(docs)
          res.send({check:true, data:docs})
        }else{
          console.log(docs)
          res.send({check:false, data:docs})
        }
      }
    })
  })

  app.get('/getcontacts', (req, res) => {
    ContactForm.find({}, function (err, docs) {
      if (err) {
        console.log("error")
        res.send(err)
      } else {
        res.send(docs)
      }
    })
  })

  app.post('/getbycaseno', (req, res) => {
    let caseNo = req.body.caseNo
    console.log("case no  ===>",caseNo )
    ContactForm.find({Case_No:caseNo}, function (err, docs) {
      if (err) {
        console.log("error")
        res.send(err)
      } else {
        console.log(docs)
        res.send(docs)
      }
    })
  })

  app.post('/getbyuserid', (req, res) => {
    let UserId = req.body.UserId
    console.log("UserId  ===>",UserId )
    ContactForm.find({UserId:UserId}, function (err, docs) {
      if (err) {
        console.log("error")
        res.send(err)
      } else {
        console.log(docs)
        res.send(docs)
      }
    })
  })

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
      user: 'verma.akash045@gmail.com', 
      pass: 'A9576227153'
    },
    tils:{
      rejectUnauthorized:false
    }
  });
 
  app.post('/sendmail', (req, res) => {
    let message = req.body.message
    let email = req.body.email
    console.log("email ==", email)
    let mailOptions = {
      from: ' "p2p Support" <verma.akash045@gmail.com>',
      to: email,
      subject: 'Reply',
      text: message
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send("err")
        console.log("error =>",error);
      } else {
        console.log('Email sent: ' + info.response)
        res.send("sent")
      }
    })
  })

server.listen(7777, () => {
    console.log("server connected")
})
