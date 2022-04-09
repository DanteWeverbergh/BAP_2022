import React, { useEffect, useState } from 'react';
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from 'react-icons/io';
import ExerciseDetails from './ExerciseDetails';
import VideoModal from './VideoModal';

function Exercise({ id, exercise, setVideoModal, setYtId }) {
  const [openDetails, setOpenDetails] = useState(false);

  useEffect(() => {
    //
  }, []);

  return (
    <>
      <div
        className="text-white-950 mb-4 mt-4 flex justify-between text-xl"
        onClick={() => setOpenDetails(!openDetails)}
      >
        <h1 onClick={() => setOpenDetails(!openDetails)}>{exercise.name}</h1>

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
      {openDetails && (
        <ExerciseDetails
          exercise={exercise}
          setVideoModal={setVideoModal}
          setYtId={setYtId}
        />
      )}
    </>
  );
}

export default Exercise;
