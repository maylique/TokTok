import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3); // Initialize countdown at 3

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((currentCountdown) => currentCountdown - 1);
    }, 1000); // Update countdown every second

    const timer = setTimeout(() => {
      clearInterval(interval); // Clear interval on navigation
      navigate("/feed");
    }, 3000); // Navigate after 3 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(interval); // Cleanup both timer and interval
    };
  }, [navigate]);

  return (
    <>
      <section className="flex flex-col gap-3 items-center justify-center min-h-screen">
        <h1>Error 404</h1>
        <h1>Page not found</h1>
        <h2>Automatic redirect in {countdown} seconds...</h2>
        <img src="https://i.imgflip.com/271pud.jpg" alt="" />
      </section>
    </>
  );
};

export default ErrorPage;
