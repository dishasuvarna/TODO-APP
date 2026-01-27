const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoModel = require('./todoModel');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todoModel.getTodos());
});

// Add a new todo
app.post('/todos', (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }
  const newTodo = todoModel.addTodo(task);
  res.json(newTodo);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = todoModel.deleteTodo(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json({ message: 'Todo deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
