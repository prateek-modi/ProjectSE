var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
require('request-debug')(request);
var fetch =  require('fetch');
var mysql = require('mysql');
// var config = require("./config.json");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.use(express.static(__dirname + '/public'));
// // var pool = mysql.createPool(config);
//
// app.get('/pooltest', (req,res)=>{
//   pool.query('SELECT * from bill;', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
//     res.send(results);
//   });
// });
//
// // An endpoint to test from mobile application
// app.get('/test', (req, res) =>{
//   var done = {
//     "sucess": 1
//   }
//   res.send(done);
// });
//
// // An endpoint to get items of a bill based on a bill id:
// app.get('/bill/:billId', (req,res)=>{
//   pool.query('SELECT * FROM Bill where billId = ?',[req.params.billId], (error,results,fields)=>{
//     if (error) throw error;
//     //console.log('The solution is: ', rows);
//     res.send(results);
//   })
// });
//
// // An endpoint to add a productin a particular order id:
// app.get('/productscan/:pId', (req,res)=>{
//   pool.query('Insert into `Bill` values(?, ?, 1)',[req.params.billId, req.params.pId], (error,results,fields)=>{
//     if (error) throw error;
//     //console.log('The solution is: ', rows);
//     res.send("added succesfully");
//   })
// });
//
// app.listen(8083, function () {
//   console.log('App listening on port 8083!');
// });
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //                                                                REGULAR DATABASE WORK

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:process.env.passoword,
    database:"gst"
  });

mysqlConnection.connect((err)=> {
  if(!err)
   console.log("DB connection succeded");
  else {
    console.log("DB connection failed \n error"+JSON.stringify(err, undefined, 2));
  }
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, ()=>console.log('express server is ready at port no: 3000'));

app.get('/', (req,res)=>{
       res.send("hi this is port 3000");
});

//query adding a product in DATABASE
app.post('/addproduct/', (req,res)=>{
  console.log("request", req.body);
  var pid = req.body.pid;
  var pname = req.body.pname;
  var price = req.body.price;
  var gstrate = req.body.gstrate;

  mysqlConnection.query('INSERT INTO `products` VALUES (?,?,?,?)',[pid.toString(), pname.toString(), parseInt(price), parseFloat(gstrate)], (err,rows,fields)=>{
    if(!err){
       res.send("added succesfully");
    }
    else {
      console.log(err);
    }
  })
});

//query for getting product with required productid
app.get('/product/', (req,res)=>{
  // console.log("id: ", req);
  // var val = req.params.id;

  console.log("req body: ", req.body);
  mysqlConnection.query("SELECT * FROM products WHERE pid=?",[req.body.id], (err,rows,fields)=>{
    if(!err){
       console.log(rows);
       res.send(rows);
    }
    else {
      console.log(err);
    }
  })
});

//
