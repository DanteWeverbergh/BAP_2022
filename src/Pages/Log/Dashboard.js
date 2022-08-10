import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import { db } from '../../Libs/Firebase';

import { doc, getDoc } from 'firebase/firestore';
import WorkoutCard from './Workout/WorkoutCard';
import { FaDumbbell, FaRunning } from 'react-icons/fa';
import RoutineCard from '../../Components/log/RoutineCard';
import CurrentRoutine from './Routines/CurrentRoutine';

function Dashboard() {
  const { user } = useAuthContext();
  const [userInfo, setUserInfo] = useState();
  const [currentRoutine, setCurrentRoutine] = useState({});
  const [rId, setRId] = useState('');
  const [workouts, setWorkouts] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let unmounted = false;

    try {
      db.collection('routines').onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          //console.log(doc.data(), doc.id);
        });
      });

      //
      /*

      db.collection('users')
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (!unmounted) {
            setUserInfo(doc.data());

            const routineId = doc.data().currentRoutineId;

            setRId(routineId);

            db.collection('Routines')
              .doc(routineId)
              .get()
              .then((r) => {
                if (!unmounted) {
                  setCurrentRoutine(r.data());
                }
              });
          }
        });
        */
    } catch (error) {
      console.log(error.message);
    }

    try {
      //

      db.collection('workouts')
        .doc(user.uid)
        .collection('workouts')
        .orderBy('created', 'desc')
        .limit(3)
        .onSnapshot((snapshot) => {
          setWorkouts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });

      setIsLoaded(true);
    } catch (error) {
      console.log(error.message);
    }

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <>
      <div className=" text-white-950 ">
        <div className="">
          <CurrentRoutine />

          <Link to="/log/workout">
            <div className="mx-12">
              <div className=" bg-blue-950 w-full py-2 mt-6 flex items-center justify-center rounded-md">
                Log your workout
              </div>
            </div>
          </Link>
        </div>

        <div>
          <h1 className="mx-12 font-semibold text-2xl mb-4 mt-12">
            Most recent workoutes
          </h1>

          {isLoaded &&
            workouts.map(({ id, data }) => (
              <WorkoutCard key={id} id={id} data={data} />
            ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
