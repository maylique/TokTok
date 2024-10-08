import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, useStore } from "@/zustand";
import "./animations.css";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { loadCurrentUserData } = useStore();

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
      toast({ description: "Login successful", variant: "success" });
      navigate("/feed");
    } catch (error) {
      toast({
        title: "Error 401: Unauthorized",
        description:
          "Backend server is currently offline, please try again in 30 seconds.",
        duration: 10000,
      });
      console.log(error);
    }
  };

  const compareLastVisitWithCurrentTime = () => {
    const [animationPlayed, setAnimationPlayed] = useState(false);

    const lastVisit = localStorage.getItem("lastVisit");
    const currentHour = new Date().getHours().toString();

    if (lastVisit !== currentHour) {
      setTimeout(() => {
        setAnimationPlayed(true);
      }, 4000);
    }

    return animationPlayed;
  };
  return (
    <section className="w-full flex justify-center">
      <div className="h-dvh px-6 pt-6 pb-12 flex-col justify-between items-center inline-flex sm:py-36">
        <div className=" text-black-800 dark:text-black-50 text-[40px] font-bold font-['Urbanist'] leading-[44px]">
          <p
            className={
              compareLastVisitWithCurrentTime()
                ? "tracking-in-expand"
                : "tracking-in-expand-register"
            }
          >
            Login
          </p>
        </div>
        <div className="relative ">
          {/* <div className="w-[140px] h-[140px] left-0 top-0 absolute bg-gradient-to-l from-rose-500 to-red-300 rounded-[48px]"> */}
          <div className="rainbow w-40 h-40">
            <img className="w-full" src="/img/logo.svg" alt="" />
          </div>
        </div>
        <form
          className="self-stretch h-[215px] flex-col justify-start items-start gap-8 flex"
          onSubmit={sendFormData}
        >
          <div className="h-[215px] flex-col justify-center items-center gap-5 flex">
            <div className="h-[60px] px-5 bg-black-50 rounded-xl justify-start items-center gap-3 inline-flex">
              <input
                className="dark:text-black h-[60px] px-5 bg-black-50 rounded-xl justify-start items-center gap-3 inline-flex outline-none"
                type="email"
                name="email"
                placeholder="email"
              />
            </div>
            <div className="h-[60px] px-5 bg-black-50 rounded-xl justify-start items-center gap-3 inline-flex">
              <input
                className="dark:text-black h-[60px] px-5 bg-black-50 rounded-xl justify-start items-center gap-3 inline-flex outline-none"
                type="password"
                name="password"
                placeholder="password"
              />
              {/* <div className="w-5 h-5 px-[2.92px] py-[1.67px] justify-center items-center flex">
              </div>
              <div className="w-5 h-5 px-[1.67px] py-[2.92px] justify-center items-center flex">
              </div> */}
            </div>
            <div className="w-full h-[55px] px-4 py-[18px] bg-primary-500 rounded-[100px] justify-center items-center gap-2.5 inline-flex">
              <button className="grow shrink basis-0 text-center text-primary-50 text-base font-bold font-['Urbanist'] leading-snug tracking-tight">
                Sign In
              </button>
            </div>
            <div className="text-center text-primary-500 text-base font-semibold font-['Urbanist'] leading-snug tracking-tight">
              Forgot the password?
            </div>
          </div>
        </form>
        <div className="self-stretch justify-center items-center gap-2 inline-flex">
          <div className="text-right text-neutral-400 text-sm font-normal font-['Urbanist'] leading-tight tracking-tight ">
            <p
              className={
                compareLastVisitWithCurrentTime()
                  ? "tracking-in-expand-delay"
                  : "tracking-in-expand-register-delay"
              }
            >
              Don't have an account?
            </p>
          </div>
          <Link
            to="/register"
            className="text-primary-500 text-sm font-semibold font-['Urbanist'] leading-tight tracking-tight "
          >
            <p
              className={
                compareLastVisitWithCurrentTime()
                  ? "tracking-in-expand-delay"
                  : "tracking-in-expand-register-delay"
              }
            >
              Sign Up
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
