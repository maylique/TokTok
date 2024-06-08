import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./tabBar.css";

const TabBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollTop = 0;

  useEffect(() => {
    window.onscroll = function () {
      const st = window.scrollY || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      lastScrollTop = st <= 0 ? 0 : st;
    };
  }, []);

  return (
    <div
      className={`tabBar dark:bg-[#0A0A0A] sm:max-w-[450px] sm:justify-self-center ${
        isVisible ? "" : "hide"
      }`}
    >
      <NavLink to="/feed">
        <button className="noStyleBtn">
          <img
            src={
              location.pathname === "/feed"
                ? "/img/ActiveHomeIcon.svg"
                : "/img/HomeIcon.svg"
            }
            alt=""
          />
        </button>
      </NavLink>
      <NavLink to="/search">
        <button className="noStyleBtn">
          <img
            src={
              location.pathname === "/search"
                ? "/img/ActiveSearchIcon.svg"
                : "/img/SearchIcon.svg"
            }
            alt=""
          />
        </button>
      </NavLink>
      <NavLink to="/newpost">
        <button className="noStyleBtn">
          <img
            src={
              location.pathname === "/newpost"
                ? "/img/ActiveUploadIcon.svg"
                : "/img/UploadIcon.svg"
            }
            alt=""
          />
        </button>
      </NavLink>
      <NavLink to="/profile">
        <button className="noStyleBtn">
          <img
            src={
              location.pathname === "/profile"
                ? "/img/ActiveProfileIcon.svg"
                : "/img/ProfileIcon.svg"
            }
            alt=""
          />
        </button>
      </NavLink>
    </div>
  );
};

export default TabBar;
