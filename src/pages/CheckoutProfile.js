import { useEffect, useState } from "react";
import AuthorDetails from "../components/AuthorDetails";
import Post from "../components/Post";
import { useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

import style from "./CheckOutProfile.module.css";

function CheckoutProfile() {
  const { id } = useParams();
  let name = "b";
  let email = "b@gmail.com";
  let image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM9yI6aQTAW6zsxMfIAtY9T6aFVzZTac5tymoEyfES1g&s";
  const { setUserCredentials, userCredentials } = useAuth();
  // let isFollowed = false;
  const [isFollowed, setIsFollowed] = useState(false);

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [image, setImage] = useState("");
  // const [isFollowed, setFollowed] = useState(false);

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      // Make post request for saving data
      const { data: res1 } = await axios.get(
        "http://127.0.0.1:3001/searchbyauthor",
        {
          headers: {
            Authorization: `Bearer ${userCredentials.auth_token}`, // Include the token as a Bearer token in the header
            authorname: `b`,
          },
        }
      );
      setUserPosts([...res1]);
    }
    fetchPosts();
  }, [userCredentials.auth_token, setUserPosts]);

  function handleFollowAuthor() {
    // make post request to server for updating the follow array
    // setUserCredentials((c) => {
    // const arr = [...c.following, id];
    // return { ...c, following: arr };
    setIsFollowed(!isFollowed);
    // });
  }

  function handleUnFollowAuthor() {
    // make post request to server for updating the follow array
    // setUserCredentials((c) => {
    //   const arr = c.following.filter((elm) => elm !== id);
    //   return { ...c, following: arr };
    // });
    setIsFollowed(!isFollowed);
  }

  // // get details of author from server
  // useEffect(() => {
  //   // async function fetchAuthorDetails() {
  //   //   const
  //   // }
  //   // once you get the name of authorId
  //   if (userCredentials.following.includes("4")) setFollowed(true);
  // }, []);

  // // get posts of author from server
  // useEffect(() => {
  //   // async function fetchAuthorDetails() {
  //   //   const
  //   // }
  // }, []);

  return (
    <div className={style.checkOutProfile}>
      <AuthorDetails name={name} email={email} image={image}></AuthorDetails>
      {!isFollowed ? (
        <button className={style.followButton} onClick={handleUnFollowAuthor}>
          Unfollow
        </button>
      ) : (
        <button className={style.followButton} onClick={handleFollowAuthor}>
          Follow
        </button>
      )}

      <div className="userPostsItems">
        {userPosts.map((post, index) => {
          return <Post post={post} key={index}></Post>;
        })}
      </div>
    </div>
  );
}

export default CheckoutProfile;
