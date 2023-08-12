import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";

import jwtDecode from "jwt-decode";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { userCredentials, setUserCredentials } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mockURL = `http://127.0.0.1:3001/login`;
      const response = await fetch(mockURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify({ user }),
      });

      const { data } = await response.json();
      const auth_token = response.headers.get("Authorization");
      // console.log(data, auth_token);
      // const res = await fetch(`http://127.0.0.1:3001/current_user`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: auth_token,
      //   },
      //   withCredentials: true,
      // });
      // const dat = await res.json();
      // console.log(dat);
      if (response.status === 200) {
        setUserCredentials({ ...data, auth_token });
        navigate("/user");
      }
    } catch (error) {
      setError(
        error.message || "An error occurred while processing your request"
      );
    }
  };

  return (
    <div className={style.Login}>
      <h1 className={style.loginHeader}>Login</h1>
      {/* {error && <div className={style.error}>{error}</div>} */}
      <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
