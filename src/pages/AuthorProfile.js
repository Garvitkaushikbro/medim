import { useEffect, useState } from "react";
import AuthorDetails from "../components/AuthorDetails";
import Post from "../components/Post";
import { useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import ListPosts from "../components/ListPosts";

import style from "./AuthorProfile.module.css";

function AuthorProfile() {
  const { authorId } = useParams();
  const { setUserCredentials, userCredentials } = useAuth();

  const isFollowing = userCredentials.following.includes(authorId);
  const [isFollowed, setIsFollowed] = useState(isFollowing);

  // get details of author from server
  useEffect(() => {
    async function fetchAuthorDetails() {
      const response = await fetch(
        `http://127.0.0.1:3001/authorDetails/${authorId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const authorDetails = await response.json();
      setAuthorDetails(authorDetails);
      const res = await fetch(`http://127.0.0.1:3001/authorPosts/${authorId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const posts = await res.json();
      setAuthorPosts(posts);
    }
    fetchAuthorDetails();
  }, []);

  const [authorPosts, setAuthorPosts] = useState([]);
  const [authorDetails, setAuthorDetails] = useState("");

  async function handleFollow() {
    await fetch(
      `http://127.0.0.1:3001/toggleFollowStatus/${userCredentials._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authorId }),
        credentials: "include",
      }
    );
    setIsFollowed(!isFollowed);
  }

  // // get posts of author from server
  // useEffect(() => {
  //   // async function fetchAuthorDetails() {
  //   //   const
  //   // }
  // }, []);

  // useEffect(() => {
  //   async function fetchPosts() {
  //     // Make post request for saving data
  //     const { data: res1 } = await axios.get(
  //       "http://127.0.0.1:3001/searchbyauthor",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${userCredentials.auth_token}`, // Include the token as a Bearer token in the header
  //           authorname: `b`,
  //         },
  //       }
  //     );
  //     setUserPosts([...res1]);
  //   }
  //   fetchPosts();
  // }, [userCredentials.auth_token, setUserPosts]);

  return (
    <div className={style.checkOutProfile}>
      <AuthorDetails
        name={authorDetails.name}
        email={authorDetails.email}
        image={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQGkLSrKx0hnC1xRnTInk3ubhjrEydQ9ubnRoaj-02bg&s"
        }
      ></AuthorDetails>
      <button className={style.followButton} onClick={handleFollow}>
        {isFollowed ? "Unfollow" : "Follow"}
      </button>
      <ListPosts displayPosts={authorPosts}></ListPosts>;
    </div>
  );
}

export default AuthorProfile;
