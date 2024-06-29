import React, { createContext, useReducer, useEffect } from 'react';

const ToDoListContext = createContext();

const toDoListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      const newTask = {
        id: state.length.toString().padStart(4, '0'),
        text: action.payload,
        completed: false
      };
      return [...state, newTask];
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case 'EDIT_TASK':
      return state.map(task =>
        task.id === action.payload.id ? { ...task, text: action.payload.text } : task
      );
    default:
      return state;
  }
};

export const ToDoListProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(toDoListReducer, [], () => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <ToDoListContext.Provider value={{ tasks, dispatch }}>
      {children}
    </ToDoListContext.Provider>
  );
};

export const useToDoListContext = () => {
  return React.useContext(ToDoListContext);
};

export default ToDoListContext;
