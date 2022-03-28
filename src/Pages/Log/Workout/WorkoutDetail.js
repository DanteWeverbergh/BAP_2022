import React, { useEffect } from 'react';
import ExerciseLog from './ExerciseLog';
import { BsPlusCircleFill } from 'react-icons/bs';

function WorkoutDetail({ days }) {
  useEffect(() => {
    console.log(days);
  });

  return (
    <>
      <div className="text-white mt-6">
        <h1 className="text-xl font-bold">{days.name}</h1>
        <div>
          {days.exercises &&
            days.exercises.map((ex) => (
              <div className="mt-10 bg-slate-700 px-4 py-2 rounded-md">
                <h1 className="text-white font-bold text-xl mb-2">{ex.name}</h1>
                <ExerciseLog exercise={ex} />
              </div>
            ))}
        </div>
        <div>
          <button
            className="bg-blue-500 px-4 py-2 rounded-md"
            onClick={() => console.log('klaar')}
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}

export default WorkoutDetail;
