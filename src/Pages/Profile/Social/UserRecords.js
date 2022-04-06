import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../Libs/Firebase';

function UserRecords({ uid }) {
  const [deadlift, setDeadlift] = useState('');
  const [squad, setSquad] = useState('');
  const [bench, setBench] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'users', uid), (doc) => {
      doc.data().deadlift1rm && setDeadlift(doc.data().deadlift1rm);
      doc.data().squad1rm && setSquad(doc.data().squad1rm);
      doc.data().bench1rm && setBench(doc.data().bench1rm);
    });
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-between mx-12">
          {deadlift && (
            <div className="bg-blue-950 rounded-full h-24 w-24 flex ">
              <p className="m-auto">{deadlift}</p>
            </div>
          )}
          {squad && (
            <div className="bg-blue-950 rounded-full h-24 w-24 flex">
              <p className="m-auto">{squad}</p>
            </div>
          )}

          {bench && (
            <div className="bg-blue-950 rounded-full h-24 w-24 flex">
              <p className="m-auto">{bench}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserRecords;
