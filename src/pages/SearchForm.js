import { useState } from "react";

function SearchForm({ setSearchFormVisible, setDisplayPosts }) {
  const [keyword, setKeyword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setDisplayPosts((c) =>
      c.filter(
        (elm) =>
          elm.title.toLowerCase().includes(keyword.toLowerCase()) ||
          elm.topic.toLowerCase().includes(keyword.toLowerCase()) ||
          elm.author.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    setSearchFormVisible(false);
  }

  return (
    <div className="SearchForm">
      <div className="searchFormOverlay overlay">
        <form id="form_search" onSubmit={handleSubmit}>
          <label for="form_post_search">Keyword</label>
          <input
            type="text"
            name="form_post_title"
            class="form_post_title"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            placeholder="Search by title, topic, author..."
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
