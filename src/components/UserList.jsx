import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAction } from "../redux/action";
import { useNavigate } from "react-router-dom";
import style from "../assets/styles/UserList.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ search: "", sort: "ascending" });

  const dispatch = useDispatch();
  const getUsers = useSelector((store) => store.users);

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const filterAndSortUsers = () => {
    let filteredUsers = getUsers.filter((user) =>
      Object.values(user).some((val) =>
        val.toString().toLowerCase().includes(filters.search.toLowerCase())
      )
    );

    if (filters.sort === "descending") {
      filteredUsers.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
    }

    setUsers(filteredUsers);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteUserAction(id, dispatch);
      toast.success(`${name} deleted successfully`);
    }
  };

  useEffect(() => {
    setUsers(getUsers);
    filterAndSortUsers();
  }, [filters.search, filters.sort, getUsers]);

  const getImageSrc = (image) => {
    if (!image) return "https://via.placeholder.com/100"; // Fallback
    if (typeof image === "string") return image; // URL
    if (image instanceof File) {
      try {
        return URL.createObjectURL(image); // Create object URL
      } catch (error) {
        console.error("Failed to create object URL:", error);
        return "https://via.placeholder.com/100"; // Fallback on error
      }
    }
    return "https://via.placeholder.com/100"; // Fallback if not valid
  };

  return (
    <div className={style.container}>
      <div className={style.topSection}>
        <input
          type="search"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search by name, email, or phone"
          className={style.searchInput}
        />
        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className={style.sortSelect}
        >
          <option value="ascending">Ascending ⬇</option>
          <option value="descending">Descending ⬆</option>
        </select>
      </div>

      <div className={style.userListSection}>
        {users && users.length > 0 ? (
          <div className={style.userCards}>
            {users.map((user, index) => (
              <div className={style.userCard} key={index}>
                <img
                  src={getImageSrc(user.image)}
                  alt={user.name}
                  className={style.userImage}
                />
                <div className={style.userInfo}>
                  <h3>{user.name}</h3>
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.phone}</p>
                  <div className={style.actions}>
                    <button onClick={() => navigate(`/edit/${user.id}`)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user.id, user.name)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={style.noUser}>No Users Available</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
