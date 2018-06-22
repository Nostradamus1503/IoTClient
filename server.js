const express    = require('express');


const app = express();

var MongoClient = require('mongodb').MongoClient,
  f = require('util').format,
  assert = require('assert');

var user = encodeURIComponent('iotuser');
var password = encodeURIComponent('M0n$$123');
var authMechanism = 'DEFAULT';

// Connection URL
var url = f('mongodb://%s:%s@178.26.2.4:27017/IoTdb',
  user, password);


function insertDataMeas(_table,_id,_name,_temp,callback) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
     var dbo = db.db("IoTdb");
     var _date = new Date(Date.now()).toLocaleDateString();
     var _time = new Date(Date.now()).toLocaleTimeString();
     var data = { 'id': _id, 'name': _name, 'value': _temp, 'date': _date, 'time': _time };
    dbo.collection(_table).insertOne(data,function(err, result) {
      if (err) throw err;
      db.close();
      callback(err, result);
    });
  });
}


app.post('/Measurements/:id/:name/:value', (req, res) => {
  insertDataMeas("Measurements",req.params.id,req.params.name,req.params.value,function(err,result)
  {
      res.json(result);
  });
});


//test


// start server

app.listen(process.env.PORT || 3000, function () {

    console.log('API andando con express...');

});