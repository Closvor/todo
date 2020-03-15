const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  port : 3306,
  database: 'lpdip01',
  password: 'rtlry'
});

app.get('/todo', function (req, res) {
  connection.query(
    'SELECT * FROM `todo`',
    function(err, results, fields) {
        res.json(results);

    }
  );
})

app.get('/todo/:id', function (req, res) {

  let todoId = req.params.id;
  let sql = "SELECT * FROM `todo` where id = ?";

  let values = [todoId];

  connection.query(sql, [values], function(error, results, fields) {
      res.json(results);
  });

  })

app.post('/todo/ajouter', (request, response) =>{
  let todo = {
    label: request.body.label,
    isDone: request.body.isDone
  }

  let sql = "INSERT INTO todo (label, isDone) values (?)";

  let values = [todo.label, todo.isDone];

  connection.query(sql, [values], function(error, results, fields) {
      if (error) {
          throw error;
      }
      console.log(results);
  });

});

app.put('/todo/modifier/:id', (request, response) => {

  let todoId = request.params.id;
  let todo = {
    label: request.body.label,
    isDone: request.body.isDone
  }
  let sql = "UPDATE todo set label = ? , isDone = ?  where id = ?";

  let values = [todo.label, todo.isDone, todoId];

  connection.query(sql, values,
      function(error, results, fields) {
      if (error) {
          throw error;
      }
  });
});

app.delete('/todo/supprimer/:id', (request, response) => {

  let todoId = request.params.id;

  let sql = "DELETE from todo where id= ?";

  let values = [todoId];

  connection.query(sql, values,
      function(error, results, fields) {
      if (error) {
          throw error;
      }
  });

});


app.listen(3000, function () { console.log('Lancé') });
