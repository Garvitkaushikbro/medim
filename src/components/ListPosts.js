import style from "./ListPosts.module.css";
import Post from "./Post";

function ListPosts({ displayPosts, setYourPosts }) {
  return (
    <div className={style.yourPostsItems}>
      {displayPosts.map((post, index) => {
        return (
          <Post post={post} setYourPosts={setYourPosts} key={index}></Post>
        );
      })}
    </div>
  );
}

export default ListPosts;
