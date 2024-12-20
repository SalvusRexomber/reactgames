import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import TodoList from './Tasks/TodoList/TodoList'; 

function Home() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>A little practice and fun with the todo list:</h1>
      <button className="todolistbutton" onClick={() => navigate("/tasks/todolist")} type="button"> TODO LIST </button>
      <a href="https://github.com/SalvusRexomber/reactgames" class="documentation">Documentation</a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tasks/TodoList" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
