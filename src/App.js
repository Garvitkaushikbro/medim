import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import CheckoutProfile from "./pages/CheckoutProfile";
import FullPost from "./pages/FullPost";

import { useAuth } from "./contexts/AuthContext";

function App() {
  const { userCredentials } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route
          path="/user"
          element={
            <Protected userCredentials={userCredentials}>
              <User />
            </Protected>
          }
        />

        <Route
          path="/checkout/:id"
          element={
            <Protected userCredentials={userCredentials}>
              <CheckoutProfile></CheckoutProfile>
            </Protected>
          }
        ></Route>

        <Route
          path="/post/:id"
          element={
            <Protected userCredentials={userCredentials}>
              <FullPost></FullPost>
            </Protected>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

function Protected({ userCredentials, children }) {
  if (!userCredentials) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default App;
