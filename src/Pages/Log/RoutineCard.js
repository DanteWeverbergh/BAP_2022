import React from 'react';

function RoutineCard() {
  return (
    <>
      <div className=" text-white bg-slate-700 rounded-md p-2 relative">
        <div className="text-center h-10 w-10 flex justify-center items-center bg-blue-500 rounded-full absolute top-2 right-2">
          6
        </div>
        <h1 className="text-xl mb-4">Push, pull, legs</h1>
        <p>6 day workout routines for intermediate to advanced lifters.</p>
      </div>
    </>
  );
}

export default RoutineCard;
