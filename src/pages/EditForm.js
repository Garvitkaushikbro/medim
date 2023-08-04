import { useState } from "react";

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
          return { ...elm, title: title, text: text, topic: topic };
        return elm;
      });
    });
  }

  return (
    <div className="EditForm">
      <div className="EditFormOverlay overlay">
        <form id="form_post" onSubmit={handleSubmit}>
          <label for="form_post_title">Title</label>
          <input
            type="text"
            name="form_post_title"
            class="form_post_title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Add title for post"
          />
          <label for="form_post_text">Description</label>
          <input
            type="textbox"
            name="form_post_text"
            class="form_post_text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Add text for post"
          />
          <label for="form_post_topic">Topic</label>
          <input
            type="text"
            name="form_post_topic"
            class="form_post_topic"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
            }}
            placeholder="Add topic for post"
          />
          <label for="form_post_image">Image</label>
          <input
            type="text"
            name="form_post_image"
            class="form_post_image"
            placeholder="Add image"
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default EditForm;
