import LoginForm from "@/components/LoginForm";
import { useStore } from "@/zustand";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loadCurrentUserData, authentication } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (authentication) {
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
