var express = require("express")
var bodyParser = require("body-parser")
var app = express()
app.use(bodyParser.json())

/*------------------Routing Started ------------------------*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,DELETE,POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(__dirname + "/build"));

app.get("/*", function(req, res) {
  res.sendFile("/build/index.html", { root: __dirname });
});

/*--------------------Routing Over----------------------------*/

app.listen(7007, function() {
  console.log("Express Started on Port 7007");
})

