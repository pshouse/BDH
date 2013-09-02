var express = require('express');
var r = require('rethinkdb');
var connection = null;
r.connect({host: 'browncoats.info', port: 49154}, function (err, conn) {
    if (err)
        throw err;
    connection = conn;
    console.log('connected to db');
});
          
var app = express();

app.get('/', function(req, res){
    r.dbList().run(connection, function(err, result) {
    if (err)
        throw err;
    res.send(result);
    })    
});

app.get('/items', function(req, res){
    r.db('BDH').table('Games').filter({abbreviation: 'AoC'})
  .withFields({id: true}).eqJoin('id',r.db('BDH').table('Items'),{index: 'game_id'}).zip()
  .withFields({name: true}).orderBy('name').run(connection, function(err, result) {
        if (err) throw err;
        res.send(result);
    })
});
app.get('/hello.txt', function(req, res) {
    res.send('Hello World');
});

app.listen(3001);
console.log('Listening on port 3001');
