import React, { useEffect } from 'react';

function Exercises({ dayId }) {
  useEffect(() => {
    console.log(dayId);
  }, []);

  return (
    <>
      <div className="text-white-950">Exercises</div>
    </>
  );
}

export default Exercises;
