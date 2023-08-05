import { useParams } from "react-router-dom";
import { useState } from "react";
import YourPosts from "../components/YourPosts";
import AllPosts from "../components/AllPosts";
import { useAuth } from "../contexts/AuthContext";
import AuthorDetails from "../components/AuthorDetails";

import style from "./User.module.css";

function User() {
  const { setUserCredentials, userCredentials } = useAuth();

  const [selectedSection, setSelectedSection] = useState(true);
  return (
    <div className={style.User}>
      <AuthorDetails
        name={userCredentials.name}
        email={userCredentials.email}
        image={userCredentials.image}
      ></AuthorDetails>
      <div className={style.userOptions}>
        <div
          onClick={() => {
            setSelectedSection(true);
          }}
          style={selectedSection ? { color: "red" } : { color: "inherit" }}
        >
          Your Posts
        </div>
        <div
          onClick={() => {
            setSelectedSection(false);
          }}
          style={!selectedSection ? { color: "red" } : { color: "inherit" }}
        >
          All Posts
        </div>
      </div>
      <div className={style.userSection}>
        {selectedSection ? <YourPosts /> : <AllPosts />}
      </div>
    </div>
  );
}

export default User;
