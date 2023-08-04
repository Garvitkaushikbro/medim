import { useState } from "react";
import style from "./AddForm.module.css";

function AddForm({ setAddFormVisible, setYourPosts }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("");

  function handleSubmit(event, setAddFormVisible) {
    event.preventDefault();
    setAddFormVisible(false);
    const date = new Date();
    const newPost = {
      title: title,
      text: text,
      topic: topic,
      image:
        "data:image/jpeg;base64,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",
      publishTime: String(date),
      author: "garvit",
      id: 3,
    };
    // Make post request for saving data
    setYourPosts((c) => {
      // Later make a useEffect that synchronizes with the server and handle errors
      localStorage.setItem("posts_1", JSON.stringify([...c, newPost]));
      return [...c, newPost];
    });
  }

  return (
    <div className="AddForm">
      <div className={style.overlay}>
        <form
          className={style.form_post}
          onSubmit={(event) => handleSubmit(event, setAddFormVisible)}
        >
          <label for="form_post_title" className={style.form_post_label}>
            Title
          </label>
          <input
            type="text"
            name="form_post_title"
            className={style.form_post_entry}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Add title for post"
          />
          <label for="form_post_text" className={style.form_post_label}>
            Description
          </label>
          <input
            type="text"
            name="form_post_text"
            className={style.form_post_entry}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Add text for post"
          />
          <label for="form_post_topic" className={style.form_post_label}>
            Topic
          </label>
          <input
            type="text"
            name="form_post_topic"
            className={style.form_post_entry}
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
            }}
            placeholder="Add topic for post"
          />
          <label for="form_post_image" className={style.form_post_label}>
            Image
          </label>
          <input
            type="file"
            name="form_post_image"
            className={style.form_post_entry}
            placeholder="Add image"
          />

          <input type="submit" className={style.submit} value="Submit" />
          <span
            className={style.cross}
            onClick={() => setAddFormVisible(false)}
          >
            &times;
          </span>
        </form>
      </div>
    </div>
  );
}

export default AddForm;
