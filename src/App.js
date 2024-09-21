import { Routes, Route } from "react-router-dom";
import "./assets/styles/global.css";
import Form from "./components/Form";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import UserList from "./components/UserList";
import Edit from "./components/Edit";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Notifications from "./components/Notifications";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<UserList />} />
        <Route path="add" element={<Form />} />
        <Route path="edit/:id" element={<Edit />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="*" element={<NotFound />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
// // // //

// import { Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";
// import NotFound from "./components/NotFound";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }

// export default App;
