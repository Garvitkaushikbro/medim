import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import CheckoutProfile from "./pages/CheckoutProfile";
import FullPost from "./pages/FullPost";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

import { useAuth } from "./contexts/AuthContext";
import RecPosts from "./components/RecPosts";
import TopPosts from "./components/TopPosts";
import MorePosts from "./components/MorePosts";
import TopicList from "./components/TopicList";
import Section from "./components/Section";

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
            <Route
              index
              element={
                <Section
                  url={`http://127.0.0.1:3001/authorPosts/${userCredentials?._id}`}
                  sectionId={0}
                ></Section>
              }
            ></Route>
            <Route
              path="yourPosts"
              element={
                <Section
                  url={`http://127.0.0.1:3001/authorPosts/${userCredentials?._id}`}
                  sectionId={0}
                ></Section>
              }
            ></Route>
            <Route
              path="recPosts"
              element={
                <Section
                  url={`http://127.0.0.1:3001/authorPosts/${userCredentials?._id}`}
                  sectionId={2}
                ></Section>
              }
            ></Route>
            <Route
              path="topPosts"
              element={
                <Section
                  url={"http://127.0.0.1:3001/articlebylogeduser"}
                  sectionId={3}
                ></Section>
              }
            ></Route>
            <Route
              path="morePosts"
              element={
                <Section
                  url={"http://127.0.0.1:3001/articlebylogeduser"}
                  sectionId={4}
                ></Section>
              }
            ></Route>
            <Route
              path="topicList"
              element={
                <Section
                  url={"http://127.0.0.1:3001/articlebylogeduser"}
                  sectionId={5}
                ></Section>
              }
            ></Route>
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
            path="/post/:postId"
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
