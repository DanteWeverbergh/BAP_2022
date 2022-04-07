import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/AuthContext';
import { db } from '../../Libs/Firebase';
import { getDocById } from '../../Libs/Firestore';
import WorkoutCard from './Workout/WorkoutCard';

function Workouts() {
  const { user } = useAuthContext();

  const [u, setU] = useState({});
  const [workouts, setWorkouts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //

    db.collection('workouts')
      .doc(user.uid)
      .collection('workouts')
      .orderBy('created', 'desc')
      .onSnapshot((snapshot) => {
        setWorkouts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded &&
        workouts.map(({ id, data }) => (
          <WorkoutCard key={id} id={id} data={data} />
        ))}

      {isLoaded && !workouts && (
        <div className="mt-6 text-white">
          You haven't done any workouts yet. Start now!
        </div>
      )}
    </>
  );
}

export default Workouts;
