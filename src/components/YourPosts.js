import { useEffect, useState } from "react";
import AddForm from "../pages/AddForm";
import FilterForm from "../pages/FilterForm";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import Search from "./Search";
import Filter from "./Filter";

import style from "./YourPosts.module.css";
import ListPosts from "./ListPosts";

function YourPosts() {
  const { userCredentials, setUserCredentials } = useAuth();
  const [yourPosts, setYourPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isFilterFormVisible, setFilterFormVisible] = useState(false);

  useEffect(() => {
    function fetchPosts() {
      // Make post request for saving data
      axios
        .get("http://127.0.0.1:3001/articlebylogeduser", {
          headers: {
            Authorization: `Bearer ${userCredentials.auth_token}`, // Include the token as a Bearer token in the header
          },
        })
        .then((response) => {
          // Handle the API response here
          setYourPosts(response.data);
          setAddFormVisible(false);
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
      setDisplayPosts(yourPosts);
    },
    [yourPosts, setDisplayPosts]
  );

  return (
    <div className={style.YourPosts}>
      <div className={style.yourPostsOptions}>
        <Add setAddFormVisible={setAddFormVisible}></Add>
        <Search
          yourPosts={yourPosts}
          setDisplayPosts={setDisplayPosts}
        ></Search>
        <Filter setFilterFormVisible={setFilterFormVisible}></Filter>
      </div>
      <ListPosts
        displayPosts={displayPosts}
        setYourPosts={setYourPosts}
      ></ListPosts>
      {isFilterFormVisible && (
        <FilterForm
          setDisplayPosts={setDisplayPosts}
          setFilterFormVisible={setFilterFormVisible}
          yourPosts={yourPosts}
        ></FilterForm>
      )}
      {isAddFormVisible && (
        <AddForm
          setYourPosts={setYourPosts}
          setAddFormVisible={setAddFormVisible}
        ></AddForm>
      )}
    </div>
  );
}

export default YourPosts;

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

// function Sort() {
//   return (
//     <div className={style.ops}>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke-width="1.5"
//         stroke="currentColor"
//       >
//         <path
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//         />
//       </svg>
//       <p>Sort</p>
//     </div>
//   );
// }
