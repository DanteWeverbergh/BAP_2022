import React, { useEffect, useState } from 'react';

function Timer({
  time,
  setTime,
  seconds,
  setSeconds,
  minutes,
  setMinutes,
  hours,
  setHours,
  isActive,
  setIsActive,
}) {
  /*
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  
  const [isActive, setIsActive] = useState(false);
  */

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
      <div className="text-center text-white-950 mb-6 py-4 rounded-md">
        <p className="text-6xl text-white-950">
          {hours}:{minutes}:{seconds}
        </p>

        <div className="flex justify-between mx-12 mt-4">
          <button
            className="bg-blue-950 px-6 py-2 rounded-md"
            onClick={() => start()}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>

          <button
            className="bg-red-950 px-6 py-2 rounded-md"
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
