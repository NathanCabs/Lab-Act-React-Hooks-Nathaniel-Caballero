import React, { useState, useContext, useCallback, useRef, useEffect } from 'react';
import ToDoListContext from '../context/ToDoListContext';
import './ToDoList.css'; 

const ToDoList = () => {
  const { dispatch } = useContext(ToDoListContext);
  const [newTaskText, setNewTaskText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); 
  }, []);

  const handleAddTask = useCallback(() => {
    if (newTaskText.trim() !== '') {
      dispatch({ type: 'ADD_TASK', payload: newTaskText });
      setNewTaskText('');
      inputRef.current.focus();
    }
  }, [newTaskText, dispatch]);

  return (
    <div>
      <h2>To Do List</h2>
      <input
        type="text"
        ref={inputRef}
        placeholder="Enter task"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
      />
      <button className="add-btn" onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default ToDoList;
