import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/Login.css";
import SignupImg from "../assets/images/signUp.png";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validate name (allow only letters)
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(fullname)) {
      toast.error(
        "Invalid name. Please enter a valid name without numbers or special characters."
      );
      return;
    }

    // Validate password (strong password with a minimum length of 8)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Invalid password. Please use a strong password with at least 8 characters, including at least one lowercase letter, one uppercase letter, and one digit."
      );
      return;
    }

    if (password !== confirmPassword) {
      // Show toast for password mismatch
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        email,
        fullname,
        password,
      });

      // Check if 'data' property exists in the response
      if (response.data.success) {
        // Show success toast
        toast.success("User registered successfully");

        // Redirect to login page
        navigate("/login", {
          state: {
            successMessage: "User registered successfully. Please log in.",
          },
        });
      } else {
        // Show an error toast if 'data' property is missing in the response
        toast.error(
          response.data.message || "Registration failed. Please try again."
        );
        console.error("Invalid response format", response);
      }
    } catch (error) {
      // Check if 'response' property exists in the error object
      if (error.response) {
        // Show error toast with the error message from the server
        toast.error(`Registration failed: ${error.response.data.message}`);
        console.error("Registration failed", error.response.data);
      } else {
        // Show a generic error toast for other types of errors
        toast.error("Registration failed. Please try again.");
        console.error("Unexpected error", error);
      }
    }
  };

  return (
    <div className="container loginContainer mt-4 p-5">
      <div className="row">
        <div className="col-md-6">
          <h3 className="loginHeading">Sign up to Blogy.com</h3>
          <form onSubmit={handleSignUp} className="LoginSection mt-4">
            <div className="inputGroup">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="LoginInput px-4 py-2"
                placeholder="blogy@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="inputGroup mt-4">
              <label htmlFor="fullname">Full Name:</label>
              <input
                type="text"
                id="fullname"
                className="LoginInput px-4 py-2"
                placeholder="Dorji Wangmo"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
            <div className="inputGroup mt-4">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                className="LoginInput px-4 py-2"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="inputGroup mt-4">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                className="LoginInput px-4 py-2"
                placeholder="*********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="mt-5 loginButton">
              SIGN UP
            </button>
            <p className="mt-3 signUptext">
              Already have an account?
              <a href="/login" className="SignUpText ps-1">
                Login
              </a>
            </p>
          </form>
        </div>
        <div className="col-md-6">
          <img className="signUpImg" src={SignupImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
