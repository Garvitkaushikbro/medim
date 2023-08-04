import style from "./FullPost.module.css";
import { Link } from "react-router-dom";

function FullPost() {
  // get this data from either server or from previos page
  let { title, topic, image, text, publishTime, author, authorId, id } = {
    title: "Nature",
    topic: "environment",
    image:
      "data:image/jpeg;base64,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",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    publishTime: "2/7/23",
    author: "garvit",
    authorId: "1",
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
              <Link to={`/checkout/${authorId}`}>Author | {author}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullPost;
