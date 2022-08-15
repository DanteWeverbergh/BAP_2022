import { doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/AuthContext';
import { db } from '../../Libs/Firebase';
import AllRoutines from './Routines/AllRoutines';
import CurrentRoutine from './Routines/CurrentRoutine';

function Routines({ u }) {
  const [routines, setRoutines] = useState([]);
  const { user } = useAuthContext();
  const [currentRoutineId, setCurrentRoutineId] = useState('');

  //search

  useEffect(() => {
    //

    let mounted = false;

    db.collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        setCurrentRoutineId(doc.data().currentRoutineId);
      });

    db.collection('routines').onSnapshot((snapshot) => {
      if (!mounted) {
        setRoutines(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            routine: doc.data(),
          }))
        );
      }
    });

    return () => {
      mounted = true;
    };
  }, []);

  return (
    <>
      {currentRoutineId && <CurrentRoutine />}
      <AllRoutines />
    </>
  );
}

export default Routines;
