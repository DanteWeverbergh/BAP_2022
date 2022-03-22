import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../../Context/Firebase';
import { db } from '../../Libs/Firebase';
import RoutineCard from './RoutineCard';

function Routines({ u }) {
  const { firebase } = useContext(FirebaseContext);

  const [isLoaded, setIsLoaded] = useState(false);
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    //

    db.collection('Routines').onSnapshot((snapshot) => {
      setRoutines(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          routine: doc.data(),
        }))
      );
      setIsLoaded(true);
    });
  }, [isLoaded]);

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
          <ul className="flex overflow-x-auto gap-6 snap-x snap-mandatory">
            {isLoaded ? (
              routines.map(({ id, routine }) => (
                <li className="shrink-0 w-3/4 snap-center">
                  <RoutineCard key={id} routine={routine} id={id} />
                </li>
              ))
            ) : (
              <div></div>
            )}
          </ul>
        </div>
      </div>

      <div className="mx-12 mt-6">
        <p>Add your own routine</p>
      </div>
    </>
  );
}

export default Routines;
