var express = require('express');
var routes = require('./routes');
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
    res.redirect('/app/index.html');
    });

app.get('/api/members/:id', function(req, res) {
 
r.db('BDH').table('Members').withFields({id: true, name: true, callWord: true}).filter({id: req.params.id}).eqJoin('id', r.db('BDH').table('Accounts'), {index: 'owner_id'}).zip().run(connection, function(err, result) {
        if (err) throw err;

    result.toArray(function(err, results) {        
    res.send(results);
    })
    
  })
});

//list members
app.get('/api/members', function(req, res) {
 
r.db('BDH').table('Members').withFields({id: true, name: true, callWord: true}).orderBy('name').run(connection, function(err, result) {
        if (err) throw err;

    result.toArray(function(err, results) {        
    res.send(results);
    })
    
  })
});

app.get('/api/items', function(req, res){
    r.db('BDH').table('Games').filter({abbreviation: 'AoC'})
  .withFields({id: true}).eqJoin('id',r.db('BDH').table('Items'),{index: 'game_id'}).zip()
  .withFields({name: true}).orderBy('name').run(connection, function(err, result) {
        if (err) throw err;
    console.log(result);
        res.send(result);
    })
});

app.get('/hello.txt', function(req, res) {
    res.send('Hello World');
} );

app.get('*', function(req, res) {
    res.sendfile(req.path.substr(1));
});

app.listen(3001);
console.log('Listening on port 3001');