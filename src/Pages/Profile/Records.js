import React from 'react';

function Records({ u }) {
  return (
    <>
      <div className="flex justify-between mx-12">
        <div className="bg-blue-500 rounded-full h-24 w-24 flex ">
          <p className="m-auto">{u.deadlift1rm}</p>
        </div>
        <div className="bg-blue-500 rounded-full h-24 w-24 flex">
          <p className="m-auto">{u.squad1rm}</p>
        </div>
        <div className="bg-blue-500 rounded-full h-24 w-24 flex">
          <p className="m-auto">{u.bench1rm}</p>
        </div>
      </div>

      <div className="flex justify-between mx-12 ">
        <div className="bg-blue-500  h-12 w-24 flex ">
          <p className="m-auto">Deadlift</p>
        </div>
        <div className="bg-blue-500  h-12 w-24 flex">
          <p className="m-auto">Squad</p>
        </div>
        <div className="bg-blue-500  h-12 w-24 flex">
          <p className="m-auto">Bench</p>
        </div>
      </div>
    </>
  );
}

export default Records;
