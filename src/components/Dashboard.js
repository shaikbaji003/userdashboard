import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../assets/styles/Dashboard.module.css";
import Navigation from "./Navigation";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [lastLogin, setLastLogin] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/login");
    } else {
      setUser(loggedInUser);
      setLastLogin(new Date().toLocaleString());
    }
  }, [navigate]);

  return (
    <div className={style.dashboard}>
      <Navigation />
      <div className={style.welcomeContainer}>
        <h2 className={style.welcomeMessage}>Welcome, {user ? user.name : "User"}❤️</h2>
        <p className={style.lastLogin}>Last Login: {lastLogin}</p>
      </div>
    </div>
  );
};

export default Dashboard;
