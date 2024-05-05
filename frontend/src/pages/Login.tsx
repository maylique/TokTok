import LoginForm from "@/components/LoginForm";
import { useStore } from "@/zustand";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loadCurrentUserData, isAuthenticated } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      loadCurrentUserData();
      navigate("/feed");
    }
  }, [navigate]);

  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
