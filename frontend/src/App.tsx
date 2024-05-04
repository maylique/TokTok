import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { Store, useStore } from "@/zustand";
import EditProfile from "./pages/EditProfile";
import SplashScreen from "./components/SplashScreen";
import Search from "./pages/Search";
import NewPost from "./pages/NewPost";
import { ThemeProvider } from "./provider/ThemeProvider";
import SinglePost from "./pages/SinglePost";
import TabBar from "./components/TabBar";

function App() {
  const { user, loadCurrentUserData, logout } = useStore() as Store;

  const navigate = useNavigate();
  useEffect(() => {
    if (!user && window.location.pathname !== "/register") {
      navigate("/login");
    }

    loadCurrentUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, loadCurrentUserData]);

  return (
    <>
      <ThemeProvider defaultTheme="system">
        <Routes>
          <Route path="/post/:postId" element={<SinglePost />} />
          <Route path="/" element={<SplashScreen />} />
          <Route path="/feed" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile/:userId" element={<EditProfile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="*" element={<button onClick={logout}>404</button>} />
        </Routes>
      </ThemeProvider>
      {window.location.pathname.startsWith("/post") ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ? null : (
        <TabBar />
      )}
    </>
  );
}

export default App;
