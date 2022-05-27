import React from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddBook from "./components/AddBook";
import BookList from './components/BookList';

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Library
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Books
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
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