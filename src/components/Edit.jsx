import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { editUserAction } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";
import style from "../assets/styles/Form.module.css";

const Edit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  
  const { id } = useParams();
  const users = useSelector((store) => store.users);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && isNaN(value)) {
      return;
    }
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editUserAction(value, dispatch);
    toast.success(`User ${value.name} Edited Successfully`);
    setValue({ name: "", email: "", phone: "", image: null });
    setImagePreview(null);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  useEffect(() => {
    const findUser = users.find((user) => user.id === id);
    if (findUser) {
      setValue(findUser);
      setImagePreview(findUser.image ? URL.createObjectURL(findUser.image) : null);
    }
  }, [users, id]);

  useEffect(() => {
    return () => {
      // Cleanup the object URL if it was created
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className={style.wrapper}>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={style.form}>
        <h2 className={style.formTitle}>Edit User</h2>
        
        <div className={style.formGroup}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={value.name}
            required
            onChange={handleChange}
            className={style.input}
          />
        </div>
        
        <div className={style.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            value={value.email}
            onChange={handleChange}
            className={style.input}
          />
        </div>
        
        <div className={style.formGroup}>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            required
            minLength={10}
            maxLength={10}
            value={value.phone}
            onChange={handleChange}
            className={style.input}
          />
        </div>

        <div className={style.formGroup}>
          <label>Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className={style.fileInput}
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className={style.imagePreview} />
          )}
        </div>

        <button type="submit" className={style.submitButton}>
          EDIT
        </button>
      </form>
    </div>
  );
};

export default Edit;
