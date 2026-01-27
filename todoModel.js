let todos = [];
let idCounter = 1;

function getTodos() {
  return todos;
}

function addTodo(task) {
  const todo = { id: idCounter++, task };
  todos.push(todo);
  return todo;
}

function deleteTodo(id) {
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
}

module.exports = { getTodos, addTodo, deleteTodo };
