// import React from "react";
// import Navigation from "./Navigation";
// import { Outlet } from "react-router-dom";
// import style from "../assets/styles/Home.module.css"

// const Home = () => {
//   return (
//     <div className={style.Container}>
//       <Navigation />
//       <Outlet />
//     </div>
//   );
// };

// export default Home;

import React from "react";
import "../assets/styles/Home.css";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Home = () => {
  return (
    <div className="Container">
      <Navbar />
      <div style={{ gap: "16px" }} className="flex-flex-start-flex-start">
        <div className="left-menu">
          <Navigation />
        </div>
        <div className="dashboard">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
