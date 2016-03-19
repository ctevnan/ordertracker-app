var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

/*Mongoose Connect*/
var db = 'mongodb://localhost/orders';
mongoose.connect(db);

var Order = require('./Order');

app.use(logger('dev'));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.get('/', function(req, res) {
  res.send(index.html);
});

//find one order
app.get('/orders', function (req, res) {
  Order.findOne(function (err, docs) {
    if (err) {
      console.log(err);
      res.send(err);
      } else {
      res.send(doc);
    }  
  })
});

//find all orders
app.get('/orders', function (req, res) {
  Order.findAll(function (err, docs) {
    if (err) {
      console.log(err);
      res.send(err);
      } else {
      res.send(doc);
    }
  })
});

//create a new order
app.post('/neworder', function (req, res) {
  var newOrder = new Order (req.body);
    newOrder.save(function (err, doc) {
     if (err) {
      console.log(err);
      res.send(err);
      } else {
      res.send(doc);
    }
  })
});

var port = 3000;
app.listen(port, function() {
  console.log("listening on port:" + port);
});