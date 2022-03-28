import React, { useEffect } from 'react';

function WorkoutDetail({ days }) {
  useEffect(() => {
    console.log(days);
  });

  return (
    <>
      <div className="text-white mt-6">
        <div>WorkoutDetail</div>
        <div>{days.name}</div>
      </div>
    </>
  );
}

export default WorkoutDetail;
