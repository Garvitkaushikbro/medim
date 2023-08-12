import { useState } from "react";
import style from "./Register.module.css";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  // const [error, setError] = useState({
  //   username: "",
  //   first_name: "",
  //   last_name: "",
  //   email: "",
  //   password: "",
  // });
  const navigate = useNavigate();

  const { userCredentials, setUserCredentials } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user);
    try {
      const mockURL = `http://127.0.0.1:3001/signup`;
      const response = await fetch(mockURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify({ user }),
      });
      const { status, data } = await response.json();
      console.log(data);
      if (status.code === 200) {
        navigate("/login");
      }
      if (response.status === 422)
        throw Error("Password must be atleast 6 characters");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={style.Register}>
      <h1 className={style.registerHeader}>Register</h1>
      {/* {error && <div className={style.error}>{error}</div>} */}
      <form onSubmit={handleSubmit}>
        <div className={style.formEntry}>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            required
          />
        </div>
        <div className={style.formEntry}>
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            required
          />
        </div>
        <div className={style.formEntry}>
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
          />
        </div>
        <div className={style.formEntry}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div className={style.formEntry}>
          <label htmlFor="image">Image</label>
          <input
            type="file" // Use type="file" for file upload
            accept=".jpg,.jpeg,.png"
            name="image"
            // onChange={handleImageChange} // Handle image file change
          />
        </div>
        <div className={style.formEntry}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
