import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../assets/css/Login.css";
import LoginImg from "../assets/images/login.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state && location.state.successMessage;

  useEffect(() => {
    if (successMessage) {
      // Clear any existing toasts
      toast.dismiss();

      // Show a success toast with the provided message
      toast.success(successMessage);
    }
  }, [successMessage]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Replace with your actual server endpoint for login
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const { token, userId, email: userEmail } = response.data;

      // Store the token in localStorage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("email", userEmail);
      localStorage.setItem("userId", userId);

      // Perform a full-page refresh
      navigate("/", {
        state: {
          successMessage: "Logged in successfully.",
        },
      });
      window.location.reload();

      // Show a success toast
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login failed", error.response?.data);

      // Display an error toast to the user
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    }
  };

  return (
    <div className="container loginContainer mt-4 p-5">
      <div className="row">
        <div className="col-md-6">
          <h3 className="loginHeading">Login to Blogy.com</h3>
          <form onSubmit={handleLogin} className="LoginSection mt-5">
            <div className="inputGroup">
              <label htmlFor="email">Email:</label>
              <input
                required
                id="email"
                className="LoginInput px-4 py-2"
                type="email"
                placeholder="blogy@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputGroup mt-4">
              <label htmlFor="password">Password:</label>
              <input
                required
                id="password"
                className="LoginInput px-4 py-2"
                type="password"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="mt-5 loginButton">
              LOGIN
            </button>
            <p className="mt-3 signUptext">
              Don't have an account?
              <a href="/signup" className="SignUpText ps-1">
                Sign Up
              </a>
            </p>
          </form>
        </div>
        <div className="col-md-6">
          <img className="LoginImg" src={LoginImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
