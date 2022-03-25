import React, { useEffect, useState } from 'react';
import { MdOndemandVideo } from 'react-icons/md';

function ExerciseDetails({ exercise }) {
  useEffect(() => {
    //
  }, []);

  return (
    <>
      <div className="text-white ">
        {exercise.exercises &&
          exercise.exercises.map((e) => (
            <div className="border-b-2 flex justify-between mt-2">
              <p>{e.name}</p>
              <div onClick={() => console.log('klik')}>
                <MdOndemandVideo />
              </div>
              <div className="flex">
                <p>sets: {e.sets}</p>
                <p className="ml-4">reps: {e.repRange}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default ExerciseDetails;
