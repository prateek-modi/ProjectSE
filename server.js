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
app.listen(8083, function () {
  console.log('App listening on port 8083!');
});
