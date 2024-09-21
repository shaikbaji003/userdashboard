import React, { useState } from "react";
import { addUserAction } from "../redux/action";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";
import style from "../assets/styles/Form.module.css";

const Form = () => {
  const [value, setValue] = useState({ name: "", email: "", phone: "", image: null });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && isNaN(value)) {
      return;
    }
    setValue((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!value.name) formErrors.name = "Name is required";
    if (!value.email) formErrors.email = "Email is required";
    if (!value.phone) formErrors.phone = "Phone number is required";
    if (value.phone && value.phone.length !== 10) {
      formErrors.phone = "Phone number must be 10 digits";
    }
    if (!value.image) formErrors.image = "Image is required";
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    addUserAction(value, dispatch);
    toast.success(`User ${value.name} added successfully`);
    setValue({ name: "", email: "", phone: "", image: null });
    setImagePreview(null);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className={style.wrapper}>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={style.form}>
        <h2 className={style.formTitle}>Add New User</h2>
        <div className={style.formGroup}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={value.name}
            onChange={handleChange}
            className={`${style.input} ${errors.name ? style.errorInput : ""}`}
          />
          {errors.name && <p className={style.errorMessage}>{errors.name}</p>}
        </div>
        <div className={style.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={value.email}
            onChange={handleChange}
            className={`${style.input} ${errors.email ? style.errorInput : ""}`}
          />
          {errors.email && <p className={style.errorMessage}>{errors.email}</p>}
        </div>
        <div className={style.formGroup}>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={value.phone}
            maxLength={10}
            onChange={handleChange}
            className={`${style.input} ${errors.phone ? style.errorInput : ""}`}
          />
          {errors.phone && <p className={style.errorMessage}>{errors.phone}</p>}
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
          {imagePreview && <img src={imagePreview} alt="Preview" className={style.imagePreview} />}
          {errors.image && <p className={style.errorMessage}>{errors.image}</p>}
        </div>
        <button type="submit" className={style.submitButton}>ADD USER</button>
      </form>
    </div>
  );
};

export default Form;
