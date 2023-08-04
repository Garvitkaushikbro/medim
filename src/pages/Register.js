import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null); // Use null as initial state for the image
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the registration data to the server
      // Replace 'your-server-url' with the actual server URL
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("image", image); // Append the image to the formData
      formData.append("password", password);

      const response = await fetch("your-server-url/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      // Check if the server response indicates successful registration
      if (data.registered) {
        // Navigate to the registered page
        // Replace '/registered-page' with the actual URL of the registered page
        window.location.href = "/registered-page";
      } else {
        // Display the error message
        setError(data.message || "User with this email already exists.");
      }
    } catch (error) {
      setError("An error occurred while processing your request.");
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file" // Use type="file" for file upload
            accept=".jpg,.jpeg,.png" // Specify accepted image file types
            onChange={handleImageChange} // Handle image file change
            required
          />
        </div>
        <div>
          <label>Password:</label>
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
