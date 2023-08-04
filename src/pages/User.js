import { useParams } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import YourPosts from "../components/YourPosts";
import AllPosts from "../components/AllPosts";
import { useAuth } from "../contexts/AuthContext";
import AuthorDetails from "../components/AuthorDetails";

function User() {
  const { setUserCredentials, userCredentials } = useAuth();

  const [selectedSection, setSelectedSection] = useState(true);
  return (
    <div className="User">
      <AuthorDetails
        name={userCredentials.name}
        email={userCredentials.email}
        image={userCredentials.image}
      ></AuthorDetails>
      <div className="userOptions">
        <Button
          onClick={() => {
            setSelectedSection(true);
          }}
          type="primary"
        >
          Your Posts
        </Button>
        <Button
          onClick={() => {
            setSelectedSection(false);
          }}
          type="primary"
        >
          All Posts
        </Button>

        {selectedSection ? <YourPosts /> : <AllPosts />}
      </div>
    </div>
  );
}

export default User;
