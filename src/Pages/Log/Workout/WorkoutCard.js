import React, { useEffect, useState } from 'react';
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

    console.log(date);
  }, []);

  return (
    <>
      <Link to={`/workouts/${id}`}>
        <div className="mx-12 bg-slate-960 rounded-md py-2 mt-6 text-white-950">
          <div className="flex justify-between mx-4">
            <div>
              <div>{data.dayName}</div>
              <div> {data.time}</div>
            </div>
            <div>{date && date}</div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default WorkoutCard;
