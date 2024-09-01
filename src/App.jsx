// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ShoppingListPage from './components/ShoppingListPage';
import ProtectedRoute from './components/ProtectedRoute';
import AddListPage from './components/AddListPage';
import UpdateListPage from './components/UpdateListPage';
import ViewListPage from './components/ViewListPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add-list" element={<AddListPage />} />
        
        <Route path="/view-list" element={<ViewListPage />} />
        <Route
          path="/shopping-list"
          element={
            <ProtectedRoute>
              <ShoppingListPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
