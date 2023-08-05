import { useState } from "react";
import style from "./AddForm.module.css";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

function AddForm({ setAddFormVisible, setYourPosts }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("");
  const { userCredentials, setUserCredentials } = useAuth();

  async function handleSubmit(event, setAddFormVisible) {
    event.preventDefault();
    setAddFormVisible(false);
    const newPost = {
      title: title,
      description: text,
      topics: topic,
    };

    const response = await axios.post(
      "http://127.0.0.1:3001/create",
      {
        title: title,
        description: text,
        topics: topic,
      },
      {
        headers: {
          Authorization: `Bearer ${userCredentials.auth_token}`, // Include the token as a Bearer token in the header
        },
      }
    );
    setYourPosts((c) => {
      return [...c, response.data];
    });
    setAddFormVisible(false);
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
