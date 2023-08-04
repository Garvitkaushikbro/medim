import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUserCredentials } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the login data to the server
      // Replace 'your-server-url' with the actual server URL

      // const response = await fetch("your-server-url/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();

      // change this part for server
      let data = {};
      data.userCredentials = {
        id: 1,
        email,
        password,
        name: "garvit",
        image:
          "data:image/jpeg;base64,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",
      };
      // data.userCredentials = null;

      // Check if the server response indicates a successful login
      if (data.userCredentials) {
        // Navigate to the authenticated page
        // Replace '/authenticated-page' with the actual URL of the authenticated page'
        setUserCredentials(data.userCredentials);
        navigate("/user");
      } else {
        // Display the error message
        setError(data.message || "Invalid email or password! Try again");
      }
    } catch (error) {
      setError("An error occurred while processing your request");
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
