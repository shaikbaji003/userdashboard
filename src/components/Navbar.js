import React from "react";
import { Link } from "react-router-dom";
import style from "../assets/styles/Navbar.css";

export function redirectToPath(pathname, target = "_self") {
  // Create a new anchor element
  const anchor = document.createElement("a");

  // Set the href attribute to the provided pathname
  anchor.href = pathname;

  // Set the target attribute
  anchor.target = target;

  // Append the anchor to the document body
  document.body.appendChild(anchor);

  // Simulate a click event on the anchor to redirect the page
  anchor.click();

  // Clean up: remove the anchor from the DOM
  anchor.remove();
}

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    redirectToPath("/login");
  };

  const isLoggedIn = !!localStorage.getItem("loggedInUser");

  return (
    <nav className="navbar">
      <h1 className="navbar-title">User Dashboard</h1>
      <div className="navbar-links">
        {isLoggedIn ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="navbar-btn">
              Login
            </Link>
            <Link to="/register" className="navbar-btn">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
