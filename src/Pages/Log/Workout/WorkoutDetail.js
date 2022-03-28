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
              <div className="mt-10">
                <ExerciseLog exercise={ex} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default WorkoutDetail;
