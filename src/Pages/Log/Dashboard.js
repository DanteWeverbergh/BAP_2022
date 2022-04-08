import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import { db } from '../../Libs/Firebase';
import { checkDuplicates } from '../../Libs/Firestore';
import RoutineCard from './RoutineCard';
import { doc, getDoc } from 'firebase/firestore';
import WorkoutCard from './Workout/WorkoutCard';

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
      //

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
    } catch (error) {
      console.log(error.message);
    }

    setIsLoaded(true);

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <>
      <div className=" text-white-950 ">
        <div className="mx-12">
          <div className="mt-6">
            <h1 className="font-semibold text-2xl mb-4">Current Routine</h1>
          </div>

          {isLoaded && (
            <Link to={`/log/${rId}`}>
              <div className=" text-white bg-slate-960 rounded-md p-2 relative">
                <div className="text-center h-10 w-10 flex justify-center items-center bg-blue-950 rounded-full absolute top-2 right-2">
                  {currentRoutine.days}
                </div>
                <h1 className="text-xl mb-4">{currentRoutine.name}</h1>
                <p>{currentRoutine.description}</p>
              </div>
            </Link>
          )}

          <Link to="/log/workout">
            <div className="bg-blue-950 w-full py-2 mt-6 flex items-center justify-center rounded-md">
              Log your workout
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
