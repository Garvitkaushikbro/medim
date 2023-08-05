import style from "./NavBar.module.css";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function NavBar() {
  const { userCredentials, setUserCredentials } = useAuth();

  function handleLogout() {
    setUserCredentials(null);
  }

  return (
    <div className={style.NavBar}>
      <div className={style.header}>Nature</div>
      <div className={style.options}>
        {userCredentials ? (
          <div className={style.logout} onClick={handleLogout}>
            Logout
          </div>
        ) : (
          <>
            <div className={style.login}>
              <Link to="/login">Login</Link>
            </div>
            <div className={style.register}>
              <Link to="/register">Register</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
