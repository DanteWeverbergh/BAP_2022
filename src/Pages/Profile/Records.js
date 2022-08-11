import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/AuthContext';
import { db } from '../../Libs/Firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { recordsUpdate, updateDoc } from '../../Libs/Firestore';
import Swal from 'sweetalert2';

function Records({ u }) {
  const [deadlift, setDeadlift] = useState('');
  const [squad, setSquad] = useState('');
  const [bench, setBench] = useState('');

  const { user } = useAuthContext();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'users', user.uid), (doc) => {
      doc.data().deadlift1rm && setDeadlift(doc.data().deadlift1rm);
      doc.data().squad1rm && setSquad(doc.data().squad1rm);
      doc.data().bench1rm && setBench(doc.data().bench1rm);
    });

    return unsub;
  }, []);

  const updateRm = (lift) => {
    Swal.fire({
      input: 'number',
      inputPlaceholder: '100',
      text: `Update your pr on the ${lift}`,
      confirmButtonText: 'Update',
      showCancelButton: true,
      cancelButtonColor: '#DA3633',
      confirmButtonColor: '#206FEB',
      background: '#0D1017',
      color: '#F0F6FC',
    }).then((result) => {
      if (lift === 'deadlift') {
        updateDoc('users', user.uid, { deadlift1rm: result.value });
        recordsUpdate(user, 'deadlift', result.value);
      } else if (lift === 'squat') {
        updateDoc('users', user.uid, { squad1rm: result.value });
        recordsUpdate(user, 'squat', result.value);
      } else if (lift === 'bench') {
        updateDoc('users', user.uid, { bench1rm: result.value });
        recordsUpdate(user, 'bench', result.value);
      }
    });
  };

  return (
    <>
      <div className="flex justify-between mx-12 text-white-950">
        <div
          onClick={() => updateRm('deadlift')}
          className="bg-blue-950 rounded-lg h-24 w-24 flex "
        >
          <p className="m-auto text-center">
            {deadlift} kg <br /> deadlift
          </p>
        </div>
        <div
          onClick={() => updateRm('squat')}
          className="bg-blue-950 rounded-lg h-24 w-24 flex"
        >
          <p className="m-auto text-center">
            {squad} kg <br />
            squat
          </p>
        </div>
        <div
          onClick={() => updateRm('bench')}
          className="bg-blue-950 rounded-lg h-24 w-24 flex"
        >
          <p className="m-auto text-center">
            {bench} kg <br /> bench
          </p>
        </div>
      </div>
    </>
  );
}

export default Records;
