import React, { useEffect, useState } from 'react';
import ExerciseLog from './ExerciseLog';
import { BsPlusCircleFill } from 'react-icons/bs';
import { logWorkout } from '../../../Libs/Firestore';
import { useAuthContext } from '../../../Context/AuthContext';

function WorkoutDetail({ days, time }) {
  const { user } = useAuthContext();
  const [log, setLog] = useState([]);

  useEffect(() => {
    //
    console.log('dag', days.name);
  });

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
                <h1 className="text-white-950 font-bold text-xl mb-2">
                  {ex.exName}
                </h1>
                {/** */}
                <ExerciseLog exercise={ex} setLog={setLog} log={log} />
              </div>
            ))}
        </div>
        <div>
          <button
            className="bg-blue-950 px-4 py-2 w-full mt-6 rounded-md"
            //onClick={() => logWorkout(user, log)}
            onClick={() => logWorkout(user, days.name, log)}
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
