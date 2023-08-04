import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";

import jwtDecode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { userCredentials, setUserCredentials } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the login data to the server
      // Replace 'your-server-url' with the actual server URL

      const response = await fetch("http://127.0.0.1:3001/userlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      // setUserCredentials(data);
      const { auth_token } = await response.json();
      console.log(auth_token);
      const decodedData = jwtDecode(auth_token);
      console.log(decodedData);
      // .Update it and also ask mridul about what to do with jwt
      setUserCredentials({ ...decodedData, name: "Kaushik", email });

      // Check if the server response indicates a successful login
      if (response.status === 200) {
        // Navigate to the authenticated page
        navigate("/user");
      } else if (response.status >= 500) {
        throw Error("Server error");
      } else if (response.status >= 400) {
        throw Error("Invalid email or password! Try again");
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
      {error && <div className={style.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className={style.formEntry}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={style.formEntry}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
