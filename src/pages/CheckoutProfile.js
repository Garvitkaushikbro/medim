import { useEffect, useState } from "react";
import AuthorDetails from "../components/AuthorDetails";
import Post from "../components/Post";
import { useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function CheckoutProfile() {
  const { id } = useParams();
  const { setUserCredentials, userCredentials } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [isFollowed, setFollowed] = useState(false);

  const [userPosts, setUserPosts] = useState([]);

  function handleFollowAuthor() {
    // make post request to server for updating the follow array
    setUserCredentials((c) => {
      const arr = [...c.following, id];
      return { ...c, following: arr };
    });
  }

  function handleUnFollowAuthor() {
    // make post request to server for updating the follow array
    setUserCredentials((c) => {
      const arr = c.following.filter((elm) => elm !== id);
      return { ...c, following: arr };
    });
  }

  // get details of author from server
  useEffect(() => {
    // async function fetchAuthorDetails() {
    //   const
    // }
    // once you get the name of authorId
    if (userCredentials.following.includes("4")) setFollowed(true);
  }, []);

  // get posts of author from server
  useEffect(() => {
    // async function fetchAuthorDetails() {
    //   const
    // }
  }, []);

  return (
    <div className="checkOutProfile">
      <AuthorDetails name={name} email={email} image={image}></AuthorDetails>
      {isFollowed ? (
        <button className="unFollowAuthor" onClick={handleUnFollowAuthor}>
          Unfollow
        </button>
      ) : (
        <button className="followAuthor" onClick={handleFollowAuthor}>
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
