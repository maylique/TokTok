import { api } from "@/lib/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, useStore } from "@/zustand";

const LoginForm = () => {
  const navigate = useNavigate();

  const { loadCurrentUserData } = useStore() as Store;
  const [, setError] = useState(false);

  const sendFormData = async (event) => {
    event.preventDefault();
    const form = event.target;
    const inputData = new FormData(form);

    try {
      await api.post("auth/login", {
        body: inputData,
        credentials: "include",
      });
      await loadCurrentUserData();

      navigate("/feed");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  return (
    <div className="w-[428px] h-[882px] px-6 pt-6 pb-12 flex-col justify-between items-center inline-flex overflow-y-scroll">
      <div className="w-[380px] text-black-800 dark:text-black-50 text-[40px] font-bold font-['Urbanist'] leading-[44px]">
        Login to your
        <br />
        Account
      </div>
      <div className="w-[140px] h-[140px] relative">
        {/* <div className="w-[140px] h-[140px] left-0 top-0 absolute bg-gradient-to-l from-rose-500 to-red-300 rounded-[48px]"> */}
        <img src="../img/Type=Logo Default, Component=Logo.svg" alt="" />
      </div>
      <form
        className="self-stretch h-[215px] flex-col justify-start items-start gap-8 flex"
        onSubmit={sendFormData}
      >
        <div className="h-[215px] flex-col justify-center items-center gap-5 flex">
          <div className="w-[380px] h-[60px] px-5 bg-black-50 rounded-xl justify-start items-center gap-3 inline-flex">
            <input
              className="dark:text-black w-[380px] h-[60px] px-5 bg-black-50 rounded-xl justify-start items-center gap-3 inline-flex outline-none"
              type="email"
              name="email"
              placeholder="email"
            />
          </div>
          <div className="w-[380px] h-[60px] px-5 bg-black-50 rounded-xl justify-start items-center gap-3 inline-flex">
            <input
              className="dark:text-black w-[380px] h-[60px] px-5 bg-black-50 rounded-xl justify-start items-center gap-3 inline-flex outline-none"
              type="password"
              name="password"
              placeholder="password"
            />
            {/* <div className="w-5 h-5 px-[2.92px] py-[1.67px] justify-center items-center flex">
            </div>
            <div className="w-5 h-5 px-[1.67px] py-[2.92px] justify-center items-center flex">
            </div> */}
          </div>
          <div className="w-[380px] h-[55px] px-4 py-[18px] bg-primary-500 rounded-[100px] justify-center items-center gap-2.5 inline-flex">
            <button className="grow shrink basis-0 text-center text-primary-50 text-base font-bold font-['Urbanist'] leading-snug tracking-tight">
              Sign In
            </button>
          </div>
          <div className="w-[380px] text-center text-primary-500 text-base font-semibold font-['Urbanist'] leading-snug tracking-tight">
            Forgot the password?
          </div>
        </div>
      </form>
      <div className="self-stretch justify-center items-center gap-2 inline-flex">
        <div className="text-right text-neutral-400 text-sm font-normal font-['Urbanist'] leading-tight tracking-tight">
          Don't have an account?
        </div>
        <Link
          to="/register"
          className="text-primary-500 text-sm font-semibold font-['Urbanist'] leading-tight tracking-tight"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
