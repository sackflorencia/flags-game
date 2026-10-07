import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { GameContext } from "../../../context/GameProvider";

const Timer = () => {
  const navigate = useNavigate();

  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Timer must be used inside GameProvider");
  }

  const { timeLeft, setTimeLeft } = context;

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/results");
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, navigate, setTimeLeft]);

  return (
    <div>
      <span>Time</span>
      <strong>{timeLeft}</strong>
    </div>
  );
};

export default Timer;