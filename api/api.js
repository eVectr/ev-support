
const AgentTicket = require('../db/agentTicket')
const User = require('../db/user.js')

let api = function (app) {

  app.post('/Register', (req, res) => {
    let Email = req.body.email
    let Name = req.body.username
    let password = req.body.password
   
    var user = new User({
      Email:Email,
      Name: Name,
      Password: password,
      Type: 'user'
    })
    user.save()
  })

  app.post('/createsupportagent', (req, res) => {
    let Name = req.body.Name
    let Password = req.body.Password
    let Type = req.body.Type

    var user = new User({
      Name: Name,
      Password: Password,
      Type:Type
    })
    user.save()
    res.send("done")
  })

  app.get('/getsupportagent', (req, res) => {
    User.find({Type:Type}, function (err, data) {
      if (err) {
        console.log("errr=>",err)
        res.send(err)
      } else {
        console.log('support agent =>', data)
        res.send(data)
      }
    })
  })

  app.post('/assignagent', (req, res) => {
    let Id = req.body.Name
    let Ticket = req.body.Password
  
    var agentTicket = new AgentTicket({
     Id:Id,
     Ticket:Ticket
    })
    agentTicket.save()
    res.send("done")
  })

}

module.exports = api
