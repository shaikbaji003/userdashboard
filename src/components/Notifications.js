// Notifications.js
import React, { useEffect, useState } from "react";
import style from "../assets/styles/Notifications.module.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulated notifications
    setNotifications([
      { id: 1, message: "You have a new friend request" },
      { id: 2, message: "Your profile was updated successfully" },
    ]);
  }, []);

  return (
    <div className={style.notifications}>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((note) => (
          <li key={note.id}>{note.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
