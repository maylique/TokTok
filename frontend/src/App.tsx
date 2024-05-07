import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";
import { Store, useStore } from "@/zustand";
import EditProfile from "./pages/EditProfile";
import SplashScreen from "./components/SplashScreen";
import Search from "./pages/Search";
import NewPost from "./pages/NewPost";
import { ThemeProvider } from "./provider/ThemeProvider";
import SinglePost from "./pages/SinglePost";
import TabBar from "./components/TabBar";
import UserProfile from "./pages/UserProfile";
import FullscreenModal from "./components/SplashScreen";
import "./components/animations.css";
import ErrorPage from "./components/ErrorPage";

function App() {
  const { user, loadCurrentUserData, logout } = useStore() as Store;

  const navigate = useNavigate();
  useEffect(() => {
    if (!user && window.location.pathname !== "/register") {
      navigate("/login");
    }
    if (!user && localStorage.getItem("token")) {
      logout();
    }

    try {
      loadCurrentUserData();
    } catch (error) {
      logout();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, loadCurrentUserData]);

  const [sawSplashScreen, setSawSplashScreen] = useState(false);

  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisit");
    const currentHour = new Date().getHours().toString();

    if (lastVisit !== currentHour) {
      setSawSplashScreen(true);
      localStorage.setItem("lastVisit", currentHour);
    }
  }, []);

  return (
    <>
      <ThemeProvider defaultTheme="light">
        <FullscreenModal
          isOpen={sawSplashScreen}
          onClose={() => setSawSplashScreen(false)}
        >
          <div className="w-40 h-40 rainbow slide-fwd-center">
            <div
              className="slide-fwd-center"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img className="w-full" src="/img/logo.svg" alt="" />
            </div>
          </div>
        </FullscreenModal>
        <Routes>
          <Route path="/post/:postId" element={<SinglePost />} />
          <Route path="/feed" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile/:userId" element={<EditProfile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="profile/:profileId" element={<UserProfile />} />
        </Routes>
      </ThemeProvider>
      {window.location.pathname.startsWith("/edit-profile") ||
      window.location.pathname.startsWith("/post") ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ? null : (
        <TabBar />
      )}
    </>
  );
}

export default App;
