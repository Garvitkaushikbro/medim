import style from "./AuthorDetails.module.css";

function AuthorDetails({ name, email, image }) {
  return (
    <div className={style.AuthorDetails}>
      <div className={style.userDetails}>
        <div className={style.imageContainer}>
          <img src={image} alt="User" />
        </div>
        <div className={style.nameContainer}>
          <h2>{name}</h2>
          <p>{email}</p>
        </div>
      </div>

      <div className={style.userStats}>
        <div className="userLikes">{`${40} likes`}</div>
        <div className="userComments">{`${4} comments`}</div>
        <div className="userViews">{`${100} views`}</div>
      </div>
    </div>
  );
}

export default AuthorDetails;
