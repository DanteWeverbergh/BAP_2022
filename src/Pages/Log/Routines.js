import React, { useEffect, useState } from 'react';
import { db } from '../../Libs/Firebase';
import AllRoutines from './Routines/AllRoutines';
import CurrentRoutine from './Routines/CurrentRoutine';

function Routines({ u }) {
  const [routines, setRoutines] = useState([]);

  //search

  useEffect(() => {
    //

    let mounted = false;

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
      <CurrentRoutine />
      <AllRoutines />
    </>
  );
}

export default Routines;
