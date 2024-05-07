import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GoBackTwice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const historyStack = window.history.state?.idx;

  const goBackTwice = () => {
    if (historyStack === 1) {
      navigate(-1); // Geht zwei Seiten zurück
    } else if (historyStack === 2) {
      navigate(-2); // Geht eine Seite zurück
    } else {
      // Fallback, wenn der Verlauf nicht ausreicht
      navigate("/feed"); // Navigieren Sie zu einer Fallback-Route
    }
  };

  return (
    <button onClick={goBackTwice}>
      <img src="/img/arrow.svg" alt="" />
    </button>
  );
};

export default GoBackTwice;
