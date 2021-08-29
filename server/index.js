const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Create a todo
app.post('/todos', async (req, res)=>{
    try {
        const { description } = req.body;
        const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description]);
        res.json(newTodo);

        console.log("body", req.body);
    } catch (error) {
        console.error(error.message);
    }  
});

// Get all todos
app.get('/todos', async(req, res)=>{
    try {
        const allTodos = await pool.query('SELECT * FROM todo');
        res.json(allTodos);
    } catch(error) {
        console.log(error.message);
    }
});

// Get a todo
app.get('/todos/:id', async(req, res)=>{
    try {
        const { id } = req.params;
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
        res.json(todo.rows[0]);
        
    } catch(error) {
        console.log(error.message);
    }
});

// Update todo
app.put('/todos/:id', async(req, res)=>{
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id]);
        
        res.json('TODO was updated');
    } catch(error) {
        console.log(error.message);
    }
});

// Delete todo
app.delete('/todos/:id', async(req, res)=>{
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query('DELETE from todo WHERE todo_id = $1', [id]);

        res.json('TODO was deleted');
    } catch(error) {
        console.log(error.message);
    }
});


app.listen(5000, ()=> {
    console.log('Server listening on port 5000')
});