var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
require('request-debug')(request);
var fetch =  require('fetch');
var mysql = require('mysql');
var config = require("./config.json");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));
var pool = mysql.createPool(config);

app.get('/pooltest', (req,res)=>{
  pool.query('SELECT * from bill;', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    res.send(results);
  });
});

// An endpoint to test from mobile application
app.get('/test', (req, res) =>{
  var done = {
    "sucess": 1
  }
  res.send(done);
});

// An endpoint to get items of a bill based on a bill id:
app.get('/bill/:billId', (req,res)=>{
  pool.query('SELECT * FROM Bill where billId = ?',[req.params.billId], (error,results,fields)=>{
    if (error) throw error;
    //console.log('The solution is: ', rows);
    res.send(results);
  })
});

// An endpoint to add a productin a particular order id:
app.get('/productscan/:pId', (req,res)=>{
  pool.query('Insert into `Bill` values(?, ?, 1)',[req.params.billId, req.params.pId], (error,results,fields)=>{
    if (error) throw error;
    //console.log('The solution is: ', rows);
    res.send("added succesfully");
  })
});

app.listen(8083, function () {
  console.log('App listening on port 8083!');
});
