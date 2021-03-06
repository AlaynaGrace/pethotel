//requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

//postico configuration
var config = {
  database: 'pethotel',
  host: 'localhost',
  port: 5432,
  max: 12
};

//create pool
var pool = new pg.Pool(config);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


app.listen(5545, function(){
  console.log('server up on 5555');
});

app.get('/pets',function(req,res){
  console.log('in get pets');
  var pets = [];

  pool.connect(function(err, connection, done){//This recieves a GET call from the client, asking for all of the
    //koalas in the DB
    if(err){//if theres an error(first paramater in pool.connect function) it will send err and res.send(400)
      console.log(err);
      res.send(400);
    }
    else{
      console.log('connected to db');//else send message, 'connected to DB'
      var resultSet = connection.query('SELECT * FROM puppy JOIN puppy_owners ON puppy.id = puppy_owners.pet_id JOIN owners ON puppy_owners.owner_id = owners.id');

      resultSet.on('row', function(row){
        pets.push(row);
      });
      resultSet.on('end', function(){
        done();
        console.log(pets);
        res.send(pets);
      });
    }
  });
}); // end app.get

app.post('/addPet', function(req, res) {
  var data = req.body;
  var insertVals = [
    data.firstName,
    data.lastName,
    data.pet,
    data.breed,
    data.color
  ];
  var insertStr = 'SELECT id FROM owners WHERE owner_first = $1 AND owner_last = $2 ';
  var poobegone = 'SELECT id FROM puppy WHERE pet_name= $1 AND color = $2 AND breed = $3 ';
  var vapepoorise = 'INSERT INTO puppy (pet_name, breed, color) VALUES ($1, $2, $3) ';



  pool.connect(function(err, connection, done){
    if(err){//is it possible to have the err in the else statment and the
      console.log(err);//connection.query in the if statement
      res.send(400);
    }
    else{
      // var petid=null;
      connection.query(vapepoorise,[data.pet, data.breed, data.color]); //returning statement in query string
      var petid = connection.query(poobegone,[data.pet, data.color, data.breed], function(err, results){
        console.log('THIS IS DJGTAKDSFAKSDFASDKFK ', results.rows[0].id);
        return results.rows[0].id;
      });

      var ownerid = connection.query(insertStr, [data.firstName, data.lastName], function(err, results){
        console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzz', results.rows[0].id);
        return results.rows[0].id;
      });
      console.log(petid, ownerid, 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
      // connection.query('INSERT INTO puppy_owners (owner_id, pet_id) VALUES($1, $2)', [ownerid, petid]);
      done();
      res.sendStatus(200);
    }
  });
}); // end of app.post

app.post('/register', function(req,res){
  console.log('in register post');
  var data = req.body;
  pool.connect(function(err, connection, done){
    if(err){
      console.log(err);
      res.send(400);
    }
    else{
      connection.query('INSERT INTO puppy (owner_first, owner_last) VALUES ($1, $2)', [data.firstName, data.lastName]);
      done();
      res.send(200);
    }
  });
});

app.delete('/delete', function(req, res) {
  pool.connect(function(err, connection, done){
    if (err){
      console.log(err);
      res.send(400);
    } else {
      connection.query('DELETE FROM puppy where id=' + req.body.id);
      done();
      res.send(200);
    }

  });//end pool connect
});//end delete function

app.post('/update', function(req,res){
  console.log('in update post');
  var updates = req.body;
  pool.connect(function(err, connection, done){
    if(err){
      console.log(err);
      res.send(400);
    }
    else{
      console.log('this is req.body ' , req.body);
      console.log();
      connection.query('UPDATE puppy SET pet_name= $1, breed= $2, color=$3 WHERE id= $4', [updates.name, updates.breed, updates.color, updates.id]);
      done();
      res.sendStatus(200);

    }
  });
});
