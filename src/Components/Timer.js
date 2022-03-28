import React, { useEffect, useState } from 'react';

function Timer({ time, setTime }) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const start = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);

      if (seconds === 60) {
        setMinutes((minutes) => minutes + 1);
        setSeconds(0);
      }

      if (minutes === 60) {
        setMinutes(0);
        setHours((hours) => hours + 1);
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <>
      <div className="text-center">
        <p className="text-6xl text-white">
          {hours}:{minutes}:{seconds}
        </p>

        <div>
          <button
            className="bg-red-400 px-6 py-2 rounded-full"
            onClick={() => start()}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>

          <button
            className="bg-blue-400 px-6 py-2 rounded-full"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default Timer;
