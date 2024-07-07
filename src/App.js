// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className="container">
      <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/list" element={<UserList />} />
          <Route path="/add" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
