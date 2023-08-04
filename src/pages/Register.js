import { useState } from "react";
import style from "./Register.module.css";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null); // Use null as initial state for the image
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { userCredentials, setUserCredentials } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the registration data to the server
      // Replace 'your-server-url' with the actual server URL
      // const formData = new FormData();
      // formData.append("name", name);
      // formData.append("email", email);
      // formData.append("image", image); // Append the image to the formData
      // formData.append("password", password);
      // console.log(formData);

      const response = await axios.post("http://127.0.0.1:3001/usercreate", {
        email: email,
        password: password,
        name: name,
      });
      const data = response.data;
      setUserCredentials(data);
      console.log("jo", data);

      if (response.status !== 200) throw Error("Server Error");
      // Check if the server response indicates successful registration
      if (response.status === 200) {
        navigate("/user");
      } else {
        // Display the error message
        setError(data.message || "User with this email already exists.");
      }
    } catch (error) {
      setError(error.message || "This email is already registered");
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={style.Register}>
      <h1 className={style.registerHeader}>Register</h1>
      {error && <div className={style.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className={style.formEntry}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={style.formEntry}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={style.formEntry}>
          <label>Image</label>
          <input
            type="file" // Use type="file" for file upload
            accept=".jpg,.jpeg,.png" // Specify accepted image file types
            onChange={handleImageChange} // Handle image file change
            required
          />
        </div>
        <div className={style.formEntry}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
