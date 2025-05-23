import React, { useState, useEffect } from 'react';

const TodoForm = ({ onSubmit, editingTodo, clearEdit }) => {
  const [title, setTitle] = useState('');
  const [rawDescription, setRawDescription] = useState('');

useEffect(() => {
  if (editingTodo) {
    setTitle(editingTodo.title);
    
    setRawDescription(editingTodo.description.join(" "));
  } else {
    setTitle('');
    setRawDescription('');
  }
}, [editingTodo]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !rawDescription.trim()) return;

    const descriptionArray = rawDescription
      .split(/[\s,.-]+/)
      .filter(item => item.trim() !== '')
      .map(text => text.trim());


    const todoData = {
      title,
      description: descriptionArray,
    };

    if (editingTodo && editingTodo.id) {
      todoData.id = editingTodo.id;
    }
    console.log("Submitting todo:", todoData);

    onSubmit(todoData);
    setTitle('');
    setRawDescription('');
    if (typeof clearEdit === 'function') {
      clearEdit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mr-2"
        required
      />
      <input
        type="text"
        placeholder="Description (e.g., breakfast lunch dinner)"
        value={rawDescription}
        onChange={(e) => setRawDescription(e.target.value)}
        className="border p-2 mr-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        {editingTodo ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default TodoForm;
