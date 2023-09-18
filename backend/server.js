const express = require('express');
//const app:express.Application = express();
const app = express();
const cors = require('cors');
//import { pg } from './db';
const pool = require('./db');

/*app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });*/
app.use(cors());
app.use(express.json());

app.post('/todos', async (req, res) => {
  try {
    //console.log(req.body);
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1)', [description]
    );
    res.json(newTodo);
  } catch(err) {
    console.log(err.message)
  }
});

app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query(
      'SELECT * FROM todo'
    );
    res.json(allTodos.rows);

  } catch(err) {
    console.log(err.message)
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      'SELECT * FROM todo WHERE todo_id = $1', [id]
    );
    
    res.json(todo.rows[0]);

  } catch(err) {
    console.log(err.message)
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    //console.log(req.body);
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      'UPDATE todo SET description=$1 WHERE todo_id=$2', [description, id]
    );
    res.json(updateTodo);
  } catch(err) {
    console.log(err.message)
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    //console.log(req.body);
    const { id } = req.params;
    const deleteTodo = await pool.query(
      'DELETE FROM todo WHERE todo_id=$1', [id]
    );
    res.json('Todo was deleted');
  } catch(err) {
    console.log(err.message)
  }
});

app.listen(5000, () => {
  console.log('server has started on port 5000');
})

//module.exports =  app;