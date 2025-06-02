import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../assets/css/Header.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
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
  // Function to handle logout
  const handleLogout = () => {
    // Clear user authentication data from local storage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");

    // Navigate to the login page
    window.location.reload();
    // Navigate to the current location with a success message
    navigate(location.pathname, {
      state: {
        successMessage: "Logged out successfully.",
      },
    });
  };

  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem("jwtToken");

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to the search results page with the search term as a query parameter
    navigate(`/search?title=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light py-3">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Blogy.com
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/postBlog">
                  Create Blog
                </NavLink>
              </li>
            )}
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                role="button"
                to="/blog"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Blog Category
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/travel">
                    Travel
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/food-cooking">
                    Food & Cooking
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/food-cooking">
                    Fashion & Style
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/food-cooking">
                    Health & Fitness
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/others">
                    Others
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link btn"
                    style={{ border: "none" }}
                    data-bs-toggle="modal"
                    data-bs-target="#logoutModal"
                    to="/login"
                  >
                    Logout
                  </NavLink>
                </li>
                {/* <!-- Modal --> */}
                <div
                  className="modal fade"
                  id="logoutModal"
                  tabindex="-1"
                  aria-labelledby="logoutModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="logoutModalLabel">
                          User Logout
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        Are sure you want to logout from blogy.com?
                      </div>
                      <div className="modal-footer">
                        <button
                          onClick={handleLogout}
                          type="button"
                          className="btn btn-logout"
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control me-2"
              type="search"
              placeholder="Search Blogs"
              aria-label="Search"
              required
            />
            <button className="search-button py-2 px-3" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                style={{ fill: "#ffffff" }}
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </nav>
  );
};

export default Header;
