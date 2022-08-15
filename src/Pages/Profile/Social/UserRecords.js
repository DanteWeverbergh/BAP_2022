import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../Libs/Firebase';
import { useParams } from 'react-router-dom';

function UserRecords({ u }) {
  const [deadlift, setDeadlift] = useState('');
  const [squad, setSquad] = useState('');
  const [bench, setBench] = useState('');

  let { uid } = useParams();

  return (
    <>
      <div className="flex justify-around mx-12 text-white-950">
        {u.deadlift1rm && (
          <div className="bg-blue-950 rounded-lg h-24 w-24 flex ">
            <p className="m-auto text-center">
              {u.deadlift1rm} kg <br /> deadlift
            </p>
          </div>
        )}
        {u.squad1rm && (
          <div className="bg-blue-950 rounded-lg h-24 w-24 flex">
            <p className="m-auto text-center">
              {u.squad1rm} kg <br /> squat
            </p>
          </div>
        )}

        {u.bench1rm && (
          <div className="bg-blue-950 rounded-lg h-24 w-24 flex">
            <p className="m-auto text-center">
              {u.bench1rm} kg <br /> Bench
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default UserRecords;
