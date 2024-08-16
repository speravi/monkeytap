import { useEffect } from "react";

type TimerProps = {
  timerDuration: number;
  gameStarted: boolean;
  gameOver: boolean;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  onTimerExpire: () => void;
};
const Timer = ({
  timerDuration,
  gameStarted,
  gameOver,
  timeLeft,
  onTimerExpire,
  setTimeLeft,
}: TimerProps) => {
  useEffect(() => {
    setTimeLeft(timerDuration);
  }, [timerDuration]);

  useEffect(() => {
    let timer: number | undefined;
    if (gameStarted && timerDuration > 0 && !gameOver) {
      timer = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            window.clearInterval(timer);
            onTimerExpire();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, [timerDuration, gameStarted]);

  return (
    <div>
      <p className="text-xl">{timeLeft}</p>
    </div>
  );
};

export default Timer;
