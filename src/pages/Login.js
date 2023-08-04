import styles from "./Login.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

// import { useAuth } from "../context/FakeAuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const { login, isAuthenticated } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    // if (email && password) login(email, password);
    navigate("/user/1");
  }

  // useEffect(
  //   function () {
  //     if (isAuthenticated) navigate("/app", { replace: true });
  //   },
  //   [isAuthenticated, navigate]
  // );

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter email..."
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter Password"
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}

export default Login;
