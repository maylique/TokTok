import LoginForm from "@/components/LoginForm";
import { useStore, Store } from "@/zustand";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, loadCurrentUserData } = useStore() as Store;
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
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
