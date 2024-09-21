import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import style from "../assets/styles/Form.module.css";

const Register = () => {
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.name || !userData.email || !userData.password) {
      setError("Please fill in all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((user) => user.email === userData.email);

    if (existingUser) {
      toast.error("User already exists");
      return;
    }

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    toast.success("Registration successful! You can now log in.");
    navigate("/login");
  };

  return (
    <div className={style.wrapper}>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={style.form}>
        <h2>Sign Up</h2>
        <div className={style.formGroup}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className={style.input}
          />
        </div>
        <div className={style.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className={style.input}
          />
        </div>
        <div className={style.formGroup}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className={style.input}
          />
        </div>
        {error && <div className={style.errorMessage}>{error}</div>}
        <button type="submit" className={style.submitButton}>Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
