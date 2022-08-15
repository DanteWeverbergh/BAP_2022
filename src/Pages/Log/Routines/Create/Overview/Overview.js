import React, { useEffect } from 'react';
import Back from '../../../../../Components/Back';
import OverviewCard from './OverviewCard';

function Overview({ routineName, shortDescription, days, dayList }) {
  useEffect(() => {
    console.log('overview: ', dayList);
  }, []);

  return (
    <>
      <div className=" mb-12 flex items-center justify-between bg-blue-950 rounded-lg py-2">
        <div className="flex">
          <div className="ml-4">
            <h1 className="font-bold text-xl routine__name">{routineName}</h1>
            <p className="routine__description">{shortDescription}</p>
          </div>
        </div>
      </div>

      {/**
       *
       */}

      {dayList.map(({ day, dayName, exerciseList }) => (
        <OverviewCard
          key={day}
          day={day}
          dayName={dayName}
          exerciseList={exerciseList}
        />
      ))}
    </>
  );
}

export default Overview;
