import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/AuthContext';
import { getDocById } from '../../Libs/Firestore';

function Workouts() {
  const { user } = useAuthContext();

  const [u, setU] = useState({});

  useEffect(() => {
    //

    getDocById('users', user.uid);

    console.log(getDocById('users', user.uid));
  }, []);

  return (
    <>
      <div className="mt-6 text-white">
        You haven't done any workouts yet. Start now!
      </div>
    </>
  );
}

export default Workouts;
