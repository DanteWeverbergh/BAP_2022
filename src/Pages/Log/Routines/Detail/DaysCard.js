import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { db } from '../../../../Libs/Firebase';

function DaysCard({ id, day }) {
  const [exercises, setExercises] = useState('');

  useEffect(() => {
    console.log(day);

    console.log(id);
  }, []);

  return (
    <>
      <Link to={`${id}`}>
        <div className="text-white-950 mx-12 mt-6 flex justify-between">
          <div className="flex">
            <div className="bg-blue-950 w-12 h-12 rounded-full flex items-center justify-center text-white-950 font-bold text-xl">
              {day.day}
            </div>
            <div className="ml-4 flex items-center">
              <h1 className="text-xl font-bold">{day.dayName}</h1>
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

export default DaysCard;
