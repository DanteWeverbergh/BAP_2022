import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FirebaseContext from '../../Context/Firebase';
import { db } from '../../Libs/Firebase';
import RoutineCard from './RoutineCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';

function Routines({ u }) {
  const { firebase } = useContext(FirebaseContext);

  const [isLoaded, setIsLoaded] = useState(false);
  const [routines, setRoutines] = useState([]);
  const [currentRoutine, setCurrentRoutine] = useState({});

  useEffect(() => {
    //

    //get all routines

    db.collection('Routines').onSnapshot((snapshot) => {
      setRoutines(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          routine: doc.data(),
        }))
      );
      setIsLoaded(true);
    });

    //getCurrentRoutine

    db.collection('Routines')
      .doc(u.currentRoutineId)
      .get()
      .then((doc) => {
        setCurrentRoutine(doc.data());
      });
  }, [isLoaded]);

  return (
    <>
      <div className=" mt-6 text-white-950">
        {u.currentRoutineId ? (
          <div className="mx-12">
            <h1 className="text-white text-2xl">Current routine</h1>

            <RoutineCard routine={currentRoutine} id={u.currentRoutineId} />
          </div>
        ) : (
          <div className="text-white">
            <p>
              No routine selected yet, please pick one or make on of your own.
            </p>
          </div>
        )}

        <div className="ml-12">
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

      <div className="mx-12 mt-6 text-white-950">
        <Link className="flex" to={'/create/routine'}>
          Add your own routine. <BsFillPlusCircleFill />
        </Link>
      </div>
    </>
  );
}

export default Routines;
