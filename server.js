const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const todoModel = require('./todoModel');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todoModel.getTodos());
});

// Add todo
app.post('/todos', (req, res) => {
    const { task } = req.body;

    if (!task) {
        return res.status(400).json({
            error: 'Task is required'
        });
    }

    const newTodo = todoModel.addTodo(task);
    res.json(newTodo);
});

// Update todo
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { task, completed } = req.body;

    const updatedTodo = todoModel.updateTodo(id, {
        task,
        completed
    });

    if (!updatedTodo) {
        return res.status(404).json({
            error: 'Todo not found'
        });
    }

    res.json(updatedTodo);
});

// Delete todo
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const deleted = todoModel.deleteTodo(id);

    if (!deleted) {
        return res.status(404).json({
            error: 'Todo not found'
        });
    }

    res.json({
        message: 'Todo deleted successfully'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});