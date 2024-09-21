import React from "react";
import { NavLink } from "react-router-dom";
import style from "../assets/styles/Navigation.module.css";

const Navigation = () => {
  return (
    <div className={style.navContainer}>
      <div className={style.nav}>
        {/* <h2 className={style.dashboardTitle}>Menu</h2> */}
        <div className={style.navLinks}>
          <NavLink to="/" className={({ isActive }) => (isActive ? style.activeLink : style.link)}>
            Home 🏠
          </NavLink>
          <NavLink to="/add" className={({ isActive }) => (isActive ? style.activeLink : style.link)}>
            Add User ➕
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
