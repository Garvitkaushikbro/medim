import { useState } from "react";
import style from "./EditForm.module.css";

function EditForm({ id, setEditFormVisible, setYourPosts }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setEditFormVisible(false);
    // Make post request for saving data
    setYourPosts((c) => {
      // Later make a useEffect that synchronizes with the server and handle errors
      localStorage.setItem(
        "posts_1",
        JSON.stringify(
          c.map((elm) => {
            if (elm.id === id)
              return { ...elm, title: title, text: text, topic: topic };
            return elm;
          })
        )
      );
      return c.map((elm) => {
        if (elm.id === id)
          return {
            ...elm,
            title: title !== "" ? title : elm.title,
            text: text !== "" ? text : elm.text,
            topic: topic !== topic ? topic : elm.topic,
          };
        return elm;
      });
    });
  }

  return (
    <div className={style.EditForm}>
      <div className={style.overlay}>
        <form className={style.form_post} onSubmit={handleSubmit}>
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

          <input type="submit" value="Submit" className={style.submit} />
          <span
            className={style.cross}
            onClick={() => setEditFormVisible(false)}
          >
            &times;
          </span>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
