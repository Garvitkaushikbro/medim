import { useEffect, useState } from "react";
import style from "./FullPost.module.css";
import { Link, useParams } from "react-router-dom";

function FullPost() {
  // get this data from either server or from previos page
  const { postId } = useParams();
  const [post, setPost] = useState({});
  useEffect(
    function () {
      async function fetchPost() {
        const URL = `http://127.0.0.1:3001/post/${postId}`;
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        setPost(data);
      }
      fetchPost();
    },
    [postId]
  );

  let { title, topic, image, text, publishTime, author, authorId } = post;

  return (
    <div className={style.FullPost}>
      <div className={style.Post}>
        <div className={style.postImgContainer}>
          <img src={image}></img>
        </div>
        <div className={style.postContent}>
          <div className={style.postWrite}>
            <div className={style.postTitle}>{title}</div>
            <div className={style.postText}>{text}</div>
            <div className={style.postPublishTime}>{publishTime}</div>
            <div className={style.postAuthor}>
              <Link to={`/checkout/${authorId}`}>Author | {author}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullPost;
