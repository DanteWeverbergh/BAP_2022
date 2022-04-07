import React, { useEffect, useState } from 'react';
import ExerciseLog from './ExerciseLog';
import { BsPlusCircleFill } from 'react-icons/bs';
import { logWorkout } from '../../../Libs/Firestore';
import { useAuthContext } from '../../../Context/AuthContext';

function WorkoutDetail({
  days,

  seconds,
  setSeconds,
  minutes,
  setMinutes,
  hours,
  setHours,
  isActive,
  setIsActive,
}) {
  const { user } = useAuthContext();
  const [log, setLog] = useState([]);

  useEffect(() => {
    //
  });

  const workout = () => {
    //
    setIsActive(false);
    const time = `${hours}:${minutes}:${seconds}`;
    logWorkout(user, days.name, log, time);
  };

  return (
    <>
      <div className="text-white-950 mt-6">
        {/**
        <h1 className="text-xl font-bold text-center ">{days.name}</h1>
         */}

        <div>
          {days.Exercises &&
            days.Exercises.map((ex) => (
              <div className="mt-10 bg-slate-960 px-4 py-2 rounded-md">
                <div className="flex flex-row">
                  <h1 className="text-white-950 font-bold text-xl mb-2">
                    {ex.exName}
                  </h1>
                  <p className="ml-4">({ex.sets} sets)</p>
                </div>
                {/** */}
                <ExerciseLog exercise={ex} setLog={setLog} log={log} />
              </div>
            ))}
        </div>
        <div>
          <button
            className="bg-blue-950 px-4 py-2 w-full mt-6 rounded-md"
            //onClick={() => logWorkout(user, log)}
            onClick={() => workout()}
          >
            Done
          </button>

          <div className="mt-32"></div>
        </div>
      </div>
    </>
  );
}

export default WorkoutDetail;
