import React, { useEffect } from 'react';

function ExerciseCard({ ex }) {
  useEffect(() => {
    console.log('hjhljhk', ex);
  }, []);

  return (
    <>
      <div className=" my-6 flex items-center justify-between  ">
        <div className="flex">
          <div className="bg-blue-950 w-12 h-12  rounded-full flex justify-center items-center">
            {ex.exercise}
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold">{ex.exerciseName}</h1>
            <div className="flex">
              <div>sets: {ex.sets}</div>
              <div className="ml-4">reps: {ex.reps}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExerciseCard;
