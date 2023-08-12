import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import CheckoutProfile from "./pages/CheckoutProfile";
import FullPost from "./pages/FullPost";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

import { useAuth } from "./contexts/AuthContext";
import YourPosts from "./components/YourPosts";
import AllPosts from "./components/AllPosts";
import RecPosts from "./components/RecPosts";
import TopPosts from "./components/TopPosts";
import MorePosts from "./components/MorePosts";
import TopicList from "./components/TopicList";

function App() {
  const { userCredentials } = useAuth();

  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route
            path="/user"
            element={
              <Protected userCredentials={userCredentials}>
                <User />
              </Protected>
            }
          >
            <Route index element={<YourPosts></YourPosts>}></Route>
            <Route path="yourPosts" element={<YourPosts></YourPosts>}></Route>
            <Route path="allPosts" element={<AllPosts></AllPosts>}></Route>
            <Route path="recPosts" element={<RecPosts></RecPosts>}></Route>
            <Route path="topPosts" element={<TopPosts></TopPosts>}></Route>
            <Route path="morePosts" element={<MorePosts></MorePosts>}></Route>
            <Route path="topicList" element={<TopicList></TopicList>}></Route>
          </Route>

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
    </>
  );
}

function Protected({ userCredentials, children }) {
  if (!userCredentials) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default App;
