import React, { useEffect, useState } from 'react';
import { db } from '../../Libs/Firebase';
import RoutineCard from './RoutineCard';

function Routines({ u }) {
  return (
    <>
      <div className="mx-12 mt-6">
        {u.currentRoutine ? (
          <div>
            <h1 className="text-white text-2xl">Current routine</h1>
            <RoutineCard />
          </div>
        ) : (
          <div className="text-white">
            <p>
              No routine selected yet, please pick one or make on of your own.
            </p>
          </div>
        )}

        <div>
          <h1 className="text-white text-2xl mt-6 mb-4">Other routines</h1>
          <RoutineCard />
        </div>
      </div>

      <div className="mx-12 mt-6">
        <p>Add your own routine</p>
      </div>
    </>
  );
}

export default Routines;
