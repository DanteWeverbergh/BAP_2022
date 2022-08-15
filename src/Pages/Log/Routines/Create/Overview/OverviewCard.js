import React, { useEffect, useState } from 'react';
import { FaDumbbell } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import ExerciseCard from './ExerciseCard';

function OverviewCard({ day, dayName, exerciseList }) {
  const [openList, setOpenList] = useState(false);

  useEffect(() => {
    console.log(exerciseList.length);
  }, []);

  return (
    <>
      <div className=" flex items-center justify-between  ">
        <div className="flex">
          <div className="bg-blue-950 w-12 h-12  rounded-full flex justify-center items-center">
            {openList ? <FaDumbbell /> : day}
          </div>
          <div className="ml-4">
            <h1 className="font-bold text-xl routine__name">{dayName}</h1>
            <p className="routine__description">
              exercises: {exerciseList.length}
            </p>
          </div>
        </div>
        <div className="text-blue-950 w-12 h-12 rounded-lg flex items-center justify-center">
          {openList ? (
            <MdKeyboardArrowUp
              className="text-4xl"
              onClick={() => setOpenList(!openList)}
            />
          ) : (
            <MdKeyboardArrowDown
              className="text-4xl"
              onClick={() => setOpenList(!openList)}
            />
          )}
        </div>
      </div>

      {openList && exerciseList.map((ex) => <ExerciseCard ex={ex} />)}

      {!openList && <div className="mb-12"></div>}
      {openList && <div className="mb-16"></div>}
    </>
  );
}

export default OverviewCard;
