import { useEffect, useState } from "react";
import FilterForm from "../pages/FilterForm";
import Post from "../components/Post";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import Search from "./Search";
import Filter from "./Filter";

import style from "./AllPosts.module.css";
import ListPosts from "./ListPosts";

function AllPosts() {
  const [AllPosts, setAllPosts] = useState([]);
  const [displayAllPosts, setDisplayAllPosts] = useState([]);
  const [isFilterFormVisible, setFilterFormVisible] = useState(false);

  const { userCredentials, setUserCredentials } = useAuth();

  useEffect(() => {
    async function fetchPosts() {
      // Make post request for saving data
      const { data: res1 } = await axios.get(
        "http://127.0.0.1:3001/searchbyauthor",
        {
          headers: {
            Authorization: `Bearer ${userCredentials.auth_token}`, // Include the token as a Bearer token in the header
            authorname: `b`,
          },
        }
      );

      const { data: res2 } = await axios.get(
        "http://127.0.0.1:3001/searchbyauthor",
        {
          headers: {
            Authorization: `Bearer ${userCredentials.auth_token}`, // Include the token as a Bearer token in the header
            authorname: `a`,
          },
        }
      );
      setAllPosts([...res1, ...res2]);
    }
    fetchPosts();
  }, [userCredentials.auth_token]);

  useEffect(
    function () {
      setDisplayAllPosts(AllPosts);
    },
    [AllPosts, setDisplayAllPosts]
  );

  return (
    <div className={style.AllPosts}>
      <div className={style.AllPostsOptions}>
        <Search
          yourPosts={AllPosts}
          setDisplayPosts={setDisplayAllPosts}
        ></Search>
        <Filter setFilterFormVisible={setFilterFormVisible}></Filter>
      </div>
      <ListPosts displayPosts={displayAllPosts} setYourPosts={null}></ListPosts>
      {isFilterFormVisible && (
        <FilterForm
          yourPosts={AllPosts}
          setDisplayPosts={setDisplayAllPosts}
          setFilterFormVisible={setFilterFormVisible}
        ></FilterForm>
      )}
    </div>
  );
}

export default AllPosts;
