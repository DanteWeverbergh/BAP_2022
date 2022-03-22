import React from 'react';
import { Link } from 'react-router-dom';

function RoutineCard({ id, routine }) {
  return (
    <>
      <Link to={`/log/${id}`}>
        <div className=" text-white bg-slate-700 rounded-md p-2 relative">
          <div className="text-center h-10 w-10 flex justify-center items-center bg-blue-500 rounded-full absolute top-2 right-2">
            {routine.days}
          </div>
          <h1 className="text-xl mb-4">{routine.name}</h1>
          <p>{routine.description}</p>
        </div>
      </Link>
    </>
  );
}

export default RoutineCard;
