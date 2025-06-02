import React, { useState, useEffect } from "react";
import Home from "./pages/home";
import Login from "./pages/Login";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import SignUp from "./pages/SignUp";
import CreateBlog from "./pages/CreateBlog";
import Search from "./pages/Search";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated (e.g., by checking the existence of a valid token)
    const token = localStorage.getItem("jwtToken");
    setIsAuthenticated(!!token); // Set to true if token exists, false otherwise
  }, []);

  const PrivateRoute = ({ element, ...rest }) => {
    return isAuthenticated ? (
      element
    ) : (
      <Navigate to="/login" replace state={{ from: rest.location }} />
    );
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<About />} />
        <Route path="/about" element={<Contact />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signUp"
          element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/postBlog"
          element={<PrivateRoute element={<CreateBlog />} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
