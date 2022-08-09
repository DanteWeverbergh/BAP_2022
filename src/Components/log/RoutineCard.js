import React, { useEffect } from 'react';
import { FaDumbbell, FaRunning } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';

function RoutineCard(type) {
  useEffect(() => {
    console.log(type.type);

    if (type.type === 'cardio') {
      console.log('loop');
    } else {
      console.log('kracht');
    }
  }, []);

  return (
    <>
      <div className="mb-12 flex items-center justify-around  ">
        <div className="bg-blue-950 w-12 h-12 rounded-full flex justify-center items-center">
          {type.type === 'cardio' ? (
            <FaRunning className="text-xl" />
          ) : (
            <FaDumbbell className="text-xl" />
          )}
        </div>
        <div>
          <h1 className="font-bold">Push pull legs</h1>
          <p>6 day push pull leg split.</p>
        </div>
        <div className="text-blue-950 w-12 h-12 rounded-lg flex items-center justify-center">
          <MdKeyboardArrowRight className="text-4xl" />
        </div>
      </div>
    </>
  );
}

export default RoutineCard;
