import LoginForm from "@/components/LoginForm";
import { useStore } from "@/zustand";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, loadCurrentUserData } = useStore()
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      loadCurrentUserData();
      navigate("/feed");
    }
  }, [navigate, user, loadCurrentUserData]);

  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
