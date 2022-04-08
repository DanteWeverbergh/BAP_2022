import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FirebaseContext from '../../Context/Firebase';
import { db } from '../../Libs/Firebase';
import RoutineCard from './RoutineCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { IoFilterOutline } from 'react-icons/io5';
import Filter from './Filter';
import { useAuthContext } from '../../Context/AuthContext';

function Routines({ u }) {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useAuthContext();

  const [isLoaded, setIsLoaded] = useState(false);
  const [routines, setRoutines] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);
  const [currentRoutine, setCurrentRoutine] = useState({});

  const [filterMenu, setFilterMenu] = useState(false);

  //filter states
  const [days, setDays] = useState('');
  const [trainer, setTrainer] = useState('');
  const [routineName, setRoutineName] = useState('');

  //search

  useEffect(() => {
    //

    let mounted = false;

    db.collection('Routines').onSnapshot((snapshot) => {
      if (!mounted) {
        setRoutines(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            routine: doc.data(),
          }))
        );
      }
    });

    //getCurrentRoutine

    db.collection('Routines')
      .doc(u.currentRoutineId)
      .get()
      .then((doc) => {
        if (!mounted) {
          setCurrentRoutine(doc.data());
        }
      });

    //get my routines
    db.collection('Routines')
      .where('creator', '==', user.uid)
      .onSnapshot((snapshot) => {
        if (!mounted) {
          setMyRoutines(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              routine: doc.data(),
            }))
          );
        }
      });

    setIsLoaded(true);

    return () => {
      mounted = true;
    };
  }, []);

  return (
    <>
      <div className=" mt-6 text-white-950">
        {u.currentRoutineId ? (
          <div className="mx-12">
            <h1 className="font-semibold text-2xl mb-4  text-white-950">
              Current routine
            </h1>

            <RoutineCard routine={currentRoutine} id={u.currentRoutineId} />
          </div>
        ) : (
          <div className="text-white">
            <p>
              No routine selected yet, please pick one or make on of your own.
            </p>
          </div>
        )}

        <div className="ml-12 mt-12">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-2xl mb-4  text-white-950">
              Other routines
            </h1>
            <IoFilterOutline
              onClick={() => setFilterMenu(!filterMenu)}
              className="text-white-950 text-2xl mr-12"
            />
          </div>

          <ul className="flex overflow-x-auto gap-6 snap-x snap-mandatory">
            {isLoaded &&
              routines
                .filter(({ routine }) => {
                  return routine;
                })
                .map(({ id, routine }) => (
                  <li className="shrink-0 w-3/4 snap-center " key={id}>
                    <RoutineCard routine={routine} id={id} />
                  </li>
                ))}
          </ul>
        </div>
      </div>

      {filterMenu && (
        <Filter
          setFilterMenu={setFilterMenu}
          days={days}
          setDays={setDays}
          trainer={trainer}
          setTrainer={setTrainer}
          routineName={routineName}
          setRoutineName={setRoutineName}
        />
      )}

      <div className="ml-12  text-white-950">
        <div className="mt-4">
          <h1 className="font-semibold text-2xl mb-4  text-white-950">
            My routines
          </h1>
          <ul className="flex overflow-x-auto gap-6 snap-x snap-mandatory">
            {isLoaded &&
              myRoutines.map(({ id, routine }) => (
                <li className="shrink-0 w-3/4 snap-center " key={id}>
                  <RoutineCard routine={routine} id={id} />
                </li>
              ))}
          </ul>
        </div>

        <Link to={'/create/routine'}>
          <div className="bg-blue-950 py-2 rounded-md mt-4 flex items-center justify-center mr-12">
            Add your own routine.
          </div>
        </Link>
      </div>
    </>
  );
}

export default Routines;
