import React from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddBook from "./components/AddBook";
import BookList from './components/BookList';
import NavBar from './partials/NavBar';

const App: React.FC = () => {
  return (
    <div>
      <NavBar />
      <div className="container mt-3">
        <BookList />
        <Routes>
          <Route path="/add" element={<AddBook />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;