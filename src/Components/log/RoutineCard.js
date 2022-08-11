import React, { useEffect } from 'react';
import { FaDumbbell } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

function RoutineCard({ type, routine, id }) {
  return (
    <>
      <Link to={`/log/${id}`}>
        <div className="mb-12 flex items-center justify-between  ">
          <div className="flex">
            <div className="bg-blue-950 w-12 h-12  rounded-full flex justify-center items-center">
              <FaDumbbell className="text-xl text-white-950" />
            </div>
            <div className="ml-4">
              <h1 className="font-bold text-xl routine__name">
                {routine.name}
              </h1>
              <p className="routine__description">{routine.shortDescription}</p>
            </div>
          </div>
          <div className="text-blue-950 w-12 h-12 rounded-lg flex items-center justify-center">
            <MdKeyboardArrowRight className="text-4xl" />
          </div>
        </div>
      </Link>
    </>
  );
}

export default RoutineCard;
