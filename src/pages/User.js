import { NavLink, Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import YourPosts from "../components/YourPosts";
import AllPosts from "../components/AllPosts";
import { useAuth } from "../contexts/AuthContext";
import AuthorDetails from "../components/AuthorDetails";

import style from "./User.module.css";

function User() {
  const { setUserCredentials, userCredentials } = useAuth();

  return (
    <div className={style.User}>
      <AuthorDetails
        name={userCredentials.name}
        email={userCredentials.email}
        image={userCredentials.image}
      ></AuthorDetails>
      <div className={style.userOptions}>
        <NavLink to="yourPosts" className={style.link}>
          Your Posts
        </NavLink>
        <NavLink to="allPosts" className={style.link}>
          All Posts
        </NavLink>
        <NavLink to="recPosts" className={style.link}>
          Rec Post
        </NavLink>
        <NavLink to="topPosts" className={style.link}>
          Top Post
        </NavLink>
        <NavLink to="morePosts" className={style.link}>
          More Posts
        </NavLink>
        <NavLink to="topicList" className={style.link}>
          Topic List
        </NavLink>
      </div>
      <div className={style.userSection}>
        <Outlet />
        {/* {selectedSection ? <YourPosts /> : <AllPosts />} */}
      </div>
    </div>
  );
}

export default User;
