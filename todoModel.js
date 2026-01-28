let todos = [];
let idCounter = 1;

function getTodos() {
  return todos;
}

function addTodo(task) {
  const newTodo = { id: idCounter++, task, completed: false };
  todos.push(newTodo);
  return newTodo;
}

function deleteTodo(id) {
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
}

function updateTodo(id, { task, completed }) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return null;
  if (task !== undefined) todo.task = task;
  if (completed !== undefined) todo.completed = completed;
  return todo;
}

module.exports = { getTodos, addTodo, deleteTodo, updateTodo };
