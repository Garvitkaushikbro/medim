import style from "./FullPost.module.css";
import { Link } from "react-router-dom";

function FullPost() {
  // get this data from either server or from previos page
  let { title, topics, image, text, publishTime, author, authorId, id } = {
    title: "Nature",
    topic: "environment",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyZ7RA3mlDh5vqCoNLmv5kUwDpKE8KN4ldm57DJepB8Q&s",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    publishTime: "3/8/23",
    author: "garvit",
    authorId: "2",
    id: "postid1",
  };

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
              <Link to={`/checkout/${authorId}`}>Author | {authorId}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullPost;
