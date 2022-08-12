import React, { useEffect, useState } from 'react';
import { FaDumbbell } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

function WorkoutCard({ id, data }) {
  const [date, setDate] = useState('');
  useEffect(() => {
    setDate(
      new Intl.DateTimeFormat('de-De', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }).format(data.created.toDate())
    );
  }, []);

  return (
    <>
      <Link to={`/workouts/${id}`}>
        <div className="text-white-950 mx-12 mt-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-blue-950 w-12 h-12 rounded-full flex items-center justify-center text-white-950 font-bold text-xl">
              <FaDumbbell />
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold">{data.dayName}</h1>
              <div className="flex">
                <div>{date && date}</div>
                <div className="ml-4">{data.time}</div>
              </div>
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

export default WorkoutCard;
