import { useEffect, useState } from "react";
import style from "./FullPost.module.css";
import { Link, useParams } from "react-router-dom";
import DisplayComments from "../components/DisplayComments";

function FullPost() {
  // get this data from either server or from previos page
  const { postId } = useParams();
  const [post, setPost] = useState({});
  console.log(post.comments);
  console.log(post.likes);
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
        <div className={style.likes}>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
          <div>{post?.likes?.length} Likes</div>
        </div>
        <div className={style.comments}>
          <DisplayComments comments={post.comments}></DisplayComments>
        </div>
      </div>
    </div>
  );
}

export default FullPost;
