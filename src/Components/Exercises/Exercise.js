import React, { useEffect, useState } from 'react';
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from 'react-icons/io';
import ExerciseDetails from './ExerciseDetails';

function Exercise({ id, exercise }) {
  const [openDetails, setOpenDetails] = useState(false);

  useEffect(() => {
    console.log(exercise);
  }, []);

  return (
    <>
      <div className="text-white mb-4 mt-4 flex justify-between text-xl">
        <h1>{exercise.name}</h1>

        {!openDetails ? (
          <IoMdArrowDropdownCircle
            className="text-2xl"
            onClick={() => setOpenDetails(!openDetails)}
          />
        ) : (
          <IoMdArrowDropupCircle
            className="text-2xl"
            onClick={() => setOpenDetails(!openDetails)}
          />
        )}
      </div>
      {openDetails && <ExerciseDetails exercise={exercise} />}
    </>
  );
}

export default Exercise;
