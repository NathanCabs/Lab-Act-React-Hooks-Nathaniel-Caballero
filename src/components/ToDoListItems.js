import React, { useContext, useState } from 'react';
import ToDoListContext from '../context/ToDoListContext';
import './ToDoListItems.css'; 

const ToDoListItems = () => {
  const { tasks, dispatch } = useContext(ToDoListContext);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');

  const handleDeleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const handleToggleTask = (taskId) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
  };

  const handleEditTask = (taskId, newText) => {
    dispatch({ type: 'EDIT_TASK', payload: { id: taskId, text: newText } });
    setEditTaskId(null);
    setEditTaskText('');
  };

  const handleCancelEdit = () => {
    setEditTaskId(null);
    setEditTaskText('');
  };

  return (
    <div>
      <h3>Tasks:</h3>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id}>
              <div className="task-item">
                <span className="task-id">ID: {task.id}</span>
                {editTaskId === task.id ? (
                  <div>
                    <input
                      type="text"
                      value={editTaskText}
                      onChange={(e) => setEditTaskText(e.target.value)}
                    />
                    <button className="edit-btn" onClick={() => handleEditTask(task.id, editTaskText)}>Save</button>
                    <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <span className="task-text">{task.text}</span>
                    <span className="task-status">{task.completed ? ' - Completed' : ' - Incomplete'}</span>
                    <button className="toggle-btn" onClick={() => handleToggleTask(task.id)}>
                      {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </button>
                    <button className="edit-btn" onClick={() => setEditTaskId(task.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToDoListItems;
