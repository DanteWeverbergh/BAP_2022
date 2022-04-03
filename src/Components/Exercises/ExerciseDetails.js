import React, { useEffect, useState } from 'react';
import { MdOndemandVideo } from 'react-icons/md';
import { db } from '../../Libs/Firebase';

function ExerciseDetails({ exercise }) {
  useEffect(() => {
    //
  }, []);

  return (
    <>
      <div className="text-white ">
        {exercise.Exercises &&
          exercise.Exercises.map((e) => (
            <div className="border-b-2 flex justify-between mt-2">
              <p>{e.exName}</p>
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
