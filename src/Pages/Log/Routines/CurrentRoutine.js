import React, { useEffect, useState } from 'react';
import RoutineCard from '../../../Components/log/RoutineCard';
import { useAuthContext } from '../../../Context/AuthContext';
import { db } from '../../../Libs/Firebase';

function CurrentRoutine() {
  const { user } = useAuthContext();

  const [userFirestore, setUserFirestore] = useState({});
  const [currentRoutine, setCurrentRoutine] = useState({});

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //
    console.log('currentuser', user.uid);

    db.collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        const currentRoutineId = doc.data().currentRoutineId;

        db.collection('routines')
          .doc(currentRoutineId)
          .get()
          .then((doc) => {
            setCurrentRoutine({
              id: doc.id,
              data: doc.data(),
            });

            setIsLoaded(true);
          });
      });
  }, []);

  return (
    <>
      {isLoaded && (
        <>
          <div className="text-white-950 mx-12 mt-6">
            <h1 className="text-xl font-bold mb-4">Current Routine</h1>
            <RoutineCard id={currentRoutine.id} routine={currentRoutine.data} />
          </div>
        </>
      )}
    </>
  );
}

export default CurrentRoutine;
