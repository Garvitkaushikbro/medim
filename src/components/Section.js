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
  const { userCredentials, setUserCredentials } = useAuth();
  const [Posts, setPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [isFilterFormVisible, setFilterFormVisible] = useState(false);

  const [isAddFormVisible, setAddFormVisible] = useState(() =>
    sectionId === 0 ? false : null
  );

  useEffect(() => {
    function fetchPosts() {
      // Make post request for saving data
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${userCredentials.auth_token}`, // Include the token as a Bearer token in the header
          },
        })
        .then((response) => {
          // Handle the API response here
          setPosts(response.data);
        })
        .catch((error) => {
          // Handle any errors that occurred during the API request
          console.error("Error:", error);
        });
    }
    fetchPosts();
  }, [userCredentials.auth_token]);

  useEffect(
    function () {
      setDisplayPosts(Posts);
    },
    [Posts]
  );

  return (
    <div className={style.YourPosts}>
      <div className={style.yourPostsOptions}>
        {isAddFormVisible !== null && (
          <Add setAddFormVisible={setAddFormVisible}></Add>
        )}
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
