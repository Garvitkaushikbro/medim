import { useEffect, useState } from "react";
import AddForm from "../pages/AddForm";
import FilterForm from "../pages/FilterForm";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import Search from "./Search";
import Filter from "./Filter";
import ListPosts from "./ListPosts";

import style from "./Section.module.css";

function Section({ url, sectionId }) {
  const { userCredentials } = useAuth();
  const [Posts, setPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [isFilterFormVisible, setFilterFormVisible] = useState(false);

  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [addOption, setAddOption] = useState(() =>
    sectionId === 0 ? true : false
  );

  useEffect(() => {
    if (sectionId === 0) setAddOption(true);
    else setAddOption(false);
  });

  useEffect(() => {
    async function fetchPosts() {
      let URL = "#";
      if (sectionId === 0)
        URL = `http://127.0.0.1:3001/authorPosts/${userCredentials._id}`;

      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const posts = await response.json();
      console.log(posts);
      setPosts(posts);
    }
    fetchPosts();
  }, [userCredentials._id, sectionId]);

  useEffect(
    function () {
      setDisplayPosts(Posts);
    },
    [Posts]
  );

  return (
    <div className={style.YourPosts}>
      <div className={style.yourPostsOptions}>
        {addOption && <Add setAddFormVisible={setAddFormVisible}></Add>}
        <Search yourPosts={Posts} setDisplayPosts={setDisplayPosts}></Search>
        <Filter setFilterFormVisible={setFilterFormVisible}></Filter>
      </div>
      <ListPosts
        displayPosts={displayPosts}
        setYourPosts={setPosts}
      ></ListPosts>
      {isFilterFormVisible && (
        <FilterForm
          setDisplayPosts={setDisplayPosts}
          setFilterFormVisible={setFilterFormVisible}
          yourPosts={Posts}
        ></FilterForm>
      )}
      {isAddFormVisible && (
        <AddForm
          setYourPosts={setPosts}
          setAddFormVisible={setAddFormVisible}
        ></AddForm>
      )}
    </div>
  );
}

export default Section;

const handleAdd = (setAddFormVisible) => {
  setAddFormVisible(true);
};

function Add({ setAddFormVisible }) {
  return (
    <div
      className={style.ops}
      alt="Add Post"
      onClick={() => handleAdd(setAddFormVisible)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
      <p>Add</p>
    </div>
  );
}
