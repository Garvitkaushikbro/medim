import { useParams } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import YourPosts from "../components/YourPosts";
import AllPosts from "../components/AllPosts";

function User() {
  const { id } = useParams();
  const [selectedSection, setSelectedSection] = useState(true);
  return (
    <div className="User">
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
