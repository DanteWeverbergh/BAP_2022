import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import { db } from '../../Libs/Firebase';
import { checkDuplicates } from '../../Libs/Firestore';
import RoutineCard from './RoutineCard';

function Dashboard() {
  const { user } = useAuthContext();
  const [userInfo, setUserInfo] = useState();
  const [currentRoutine, setCurrentRoutine] = useState({});

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //
    let isMounted = true;

    db.collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        setUserInfo(doc.data());

        db.collection('Routines')
          .doc(doc.data().currentRoutineId)
          .get()
          .then((routine) => {
            if (isMounted) {
              setCurrentRoutine({
                id: routine.id,
                routine: routine.data(),
              });
            }
          });
      });

    setIsLoaded(true);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="mx-12">
        <div className="mt-6 text-white-950">Dashboard</div>

        <Link
          to="/log/workout"
          className=" px-5 py-2 bg-blue-950  text-white-950 rounded-md"
        >
          Log your workout
        </Link>
      </div>
    </>
  );
}

export default Dashboard;
