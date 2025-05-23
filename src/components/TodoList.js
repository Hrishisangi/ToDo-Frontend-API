import React, { useState, useEffect } from "react";
import { updateTodo } from "../api/api";

const TodoList = ({ todos, onEdit, onDelete, onDataUpdate }) => {
  const [checkboxStates, setCheckboxStates] = useState({});

  
  useEffect(() => {
    const initialStates = {};
    todos.forEach(todo => {
      const savedState = checkboxStates[todo.id];
      if (savedState && savedState.length === todo.description.length) {
        initialStates[todo.id] = savedState;
      } else {
        initialStates[todo.id] = todo.description.map(() => false);
      }
    });
    setCheckboxStates(initialStates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  const handleCheckboxToggle = async (todoId, index) => {
    const todo = todos.find(t => t.id === todoId);
    if (!todo) return;

    const updatedCheckboxes = [...(checkboxStates[todoId] || [])];
    updatedCheckboxes[index] = !updatedCheckboxes[index];

    const isCompleted = updatedCheckboxes.every(checked => checked);

    
    setCheckboxStates(prev => ({
      ...prev,
      [todoId]: updatedCheckboxes
    }));

    const updatedTodo = {
      ...todo,
      isCompleted
    };

    await updateTodo(todoId, updatedTodo);

   
    if (typeof onDataUpdate === "function") {
      onDataUpdate();
    }
  };

  return (
    <div className="todo-list">
      <h2>To-Do Items</h2>
      {todos.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <h3>{todo.title}</h3>
            <ul>
              {todo.description.map((item, index) => (
                <li key={index} style={{ listStyle: "none" }}>
                  <label className={checkboxStates[todo.id]?.[index] ? "strike" : ""}>
                    <input
                      type="checkbox"
                      checked={checkboxStates[todo.id]?.[index] || false}
                      onChange={() => handleCheckboxToggle(todo.id, index)}
                      className="mr-2"
                    />
                    {item}
                  </label>
                </li>
              ))}
            </ul>
            <p>Status: {todo.isCompleted ? "Completed" : "Pending"}</p>
            <button onClick={() => onEdit(todo)}>Edit</button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
