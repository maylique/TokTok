import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";
import { User, useStore } from "@/zustand";
import EditProfile from "./pages/EditProfile";
import SplashScreen from "./components/SplashScreen";
import Search from "./pages/Search";
import NewPost from "./pages/NewPost";
import { ThemeProvider } from "./provider/ThemeProvider";
import SinglePost from "./pages/SinglePost";
import TabBar from "./components/TabBar";
import UserProfile from "./pages/UserProfile";
import { api } from "./lib/api";

function App() {
  const { user, loadCurrentUserData, logout, authentication } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await api.get("auth/checkauth", {
        credentials: "include",
      });
      const data = (await response.json()) as User;
      if (data.isAuthenticated) {
        authentication(true);
      } else {
        authentication(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!user && window.location.pathname !== "/register") {
      navigate("/login");
    }
    if (!authentication) {
      logout();
    }

    try {
      loadCurrentUserData();
    } catch (error) {
      logout();
    }
    console.log("jojo");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

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
          <Route path="profile/:profileId" element={<UserProfile />} />
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
