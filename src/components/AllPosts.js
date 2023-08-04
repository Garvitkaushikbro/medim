import { useEffect, useState } from "react";
import AddForm from "../pages/AddForm";
import SearchForm from "../pages/SearchForm";
import FilterForm from "../pages/FilterForm";
import Post from "../components/Post";

import style from "./AllPosts.module.css";

function AllPosts() {
  const [AllPosts, setAllPosts] = useState(() => {
    // make fetch request here for gettting users array of posts
    return JSON.parse(localStorage.getItem("posts_1"));
  });
  const [displayAllPosts, setDisplayAllPosts] = useState([]);
  const [isSearchFormVisible, setSearchFormVisible] = useState(false);
  const [isFilterFormVisible, setFilterFormVisible] = useState(false);

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
          AllPosts={AllPosts}
          setDisplayAllPosts={setDisplayAllPosts}
        ></Search>
        <Filter setFilterFormVisible={setFilterFormVisible}></Filter>
        {/* <Sort displayAllPosts={displayAllPosts}></Sort> */}
      </div>
      <div className={style.AllPostsItems}>
        {displayAllPosts.map((post, index) => {
          return <Post post={post} setYourPosts={null} key={index}></Post>;
        })}
      </div>

      {isSearchFormVisible && (
        <SearchForm
          // add set posts
          setDisplayPosts={setDisplayAllPosts}
        ></SearchForm>
      )}
      {isFilterFormVisible && (
        <FilterForm
          setDisplayPosts={setDisplayAllPosts}
          setFilterFormVisible={setFilterFormVisible}
        ></FilterForm>
      )}
    </div>
  );
}

export default AllPosts;

function Search({ setDisplayAllPosts, AllPosts }) {
  const [keyword, setKeyword] = useState("");
  const handleClick = (e) => {
    setKeyword(e.target.value);
    if (keyword === "") setDisplayAllPosts(AllPosts);
    else {
      setDisplayAllPosts((c) =>
        AllPosts.filter(
          (elm) =>
            elm.title.toLowerCase().includes(keyword.toLowerCase()) ||
            elm.topic.toLowerCase().includes(keyword.toLowerCase()) ||
            elm.author.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
  };
  return (
    <div className={style.Search} onClick={handleClick}>
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
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <input type="text" value={keyword} onChange={handleClick}></input>
    </div>
  );
}

function Sort() {
  return (
    <div className="sort">
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
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p>Sort</p>
    </div>
  );
}

function Filter({ setFilterFormVisible }) {
  return (
    <div className="filter" onClick={() => setFilterFormVisible(true)}>
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
          d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
        />
      </svg>
      <p>Filter</p>
      {/* <div class="filterOptions hidden">
      <div class="noFilter">No Filter</div>
      <div class="filterHigh">High</div>
      <div class="filterLow">Low</div>
      <div class="filterMedium">Medium</div>
      <div class="filterDone">Complete</div>
      <div class="filterNotDone">Not complete</div>
      <div class="categoryFilter">Category Filter</div>
    </div> */}
    </div>
  );
}
