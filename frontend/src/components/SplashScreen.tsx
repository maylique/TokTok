import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const hasSeenSplashScreen = localStorage.getItem("splashScreenShown");
    if (hasSeenSplashScreen) {
      setShowSplashScreen(false);
    } else {
      localStorage.setItem("splashScreenShown", "true");
    }
  }, []);

  if (!showSplashScreen) {
    navigate("/login");
  }

  return (
    <div className="splash-screen">
      <img src="./img/logo.jpg" alt="" />
    </div>
  );
};

export default SplashScreen;
