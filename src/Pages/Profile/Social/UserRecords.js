import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../Libs/Firebase';

function UserRecords({ uid }) {
  const [deadlift, setDeadlift] = useState('');
  const [squad, setSquad] = useState('');
  const [bench, setBench] = useState('');

  useEffect(() => {
    let unmounted = false;

    const unsub = onSnapshot(doc(db, 'users', uid), (doc) => {
      if (!unmounted) {
        doc.data().deadlift1rm && setDeadlift(doc.data().deadlift1rm);
        doc.data().squad1rm && setSquad(doc.data().squad1rm);
        doc.data().bench1rm && setBench(doc.data().bench1rm);
      }
    });

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <>
      <div className="text-white-950">
        <div className="flex justify-between mx-12">
          {deadlift && (
            <div className="bg-slate-960 rounded-full h-24 w-24 flex ">
              <p className="m-auto text-center">
                {deadlift} <br /> deadlift
              </p>
            </div>
          )}
          {squad && (
            <div className="bg-slate-960 rounded-full h-24 w-24 flex">
              <p className="m-auto text-center">
                {squad} <br /> squat
              </p>
            </div>
          )}

          {bench && (
            <div className="bg-slate-960 rounded-full h-24 w-24 flex">
              <p className="m-auto text-center">
                {bench} <br /> Bench
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserRecords;
