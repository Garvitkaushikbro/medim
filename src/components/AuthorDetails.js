function AuthorDetails({ name, email, image }) {
  return (
    <>
      <div className="userDetails">
        <div className="userDetails">
          <h2>Name: {name}</h2>
          <p>Email: {email}</p>
          <img src={image} alt="User" />
        </div>
      </div>

      <div className="userStats">
        <div className="userLikes">{`${40} likes`}</div>
        <div className="userComments">{`${4} comments`}</div>
        <div className="userViews">{`${100} views`}</div>
      </div>
    </>
  );
}

export default AuthorDetails;
