import React, { useEffect, useState } from 'react';
import RoutineCard from '../../../Components/log/RoutineCard';
import { db } from '../../../Libs/Firebase';

function AllRoutines() {
  const [routines, setRoutines] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      db.collection('routines').onSnapshot((snapshot) => {
        setRoutines(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            routine: doc.data(),
          }))
        );
      });
    } catch (error) {
      console.log(error);
    }

    setIsLoaded(true);
  }, []);

  return (
    <>
      <div className="mx-12 text-white-950 mt-12">
        <h1 className="text-xl font-bold mb-4 ">All Routines</h1>
        {isLoaded &&
          routines.map(({ routine, id }) => (
            <RoutineCard key={id} id={id} routine={routine} />
          ))}
      </div>
    </>
  );
}

export default AllRoutines;
