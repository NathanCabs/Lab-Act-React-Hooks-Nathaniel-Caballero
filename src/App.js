import React from 'react';
import ToDoList from './components/ToDoList';
import ToDoListItems from './components/ToDoListItems';
import { ToDoListProvider } from './context/ToDoListContext';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <div className="content">
        <ToDoListProvider>
          <ToDoList />
          <ToDoListItems />
        </ToDoListProvider>
      </div>
    </div>
  );
};

export default App;
