import React, { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import './App.css';

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./api/api";

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (todoData) => {
    await createTodo(todoData);
    fetchTodos();
  };

  const handleUpdateTodo = async (updatedTodo) => {
    await updateTodo(updatedTodo.id, updatedTodo);
    setEditingTodo(null);
    fetchTodos();
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

return (
  <div className="App">
    <h1>To-Do List</h1>
    <TodoForm
      onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
      editingTodo={editingTodo}
      clearEdit={() => setEditingTodo(null)}
    />
    <TodoList
  todos={todos}
  onEdit={handleEdit}
  onDelete={handleDeleteTodo}
  onDataUpdate={fetchTodos}
/>

  </div>
);

}

export default App;
