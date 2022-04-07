import React, { useEffect, useState } from 'react';
import { IoIosFitness } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../Context/AuthContext';
import Footer from '../../../Layouts/Footer/Footer';
import Header from '../../../Layouts/Header/Header';
import { db } from '../../../Libs/Firebase';

function WorkoutInfo() {
  let { id } = useParams();
  const { user } = useAuthContext();

  const [workout, setWorkout] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    //
    try {
      db.collection('workouts')
        .doc(user.uid)
        .collection('workouts')
        .doc(id)
        .get()
        .then((doc) => {
          setWorkout(doc.data());

          setRoutine(doc.data().log.map((exercise) => exercise));

          console.log(routine.map((r) => r.exercise.length));
        });

      setIsLoaded(true);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <>
      <Header />

      <div className="text-white-950 mx-12">
        <div className="">
          <h1 className="text-2xl font-semibold">
            {isLoaded && workout.dayName}
          </h1>
        </div>

        <div>
          {isLoaded &&
            routine.map((routine) => (
              <div>
                {/**
                <h1>{routine.exercise[0].exName}</h1>
                 */}
                <p className="mt-6 bg-slate-960 rounded-md px-4 py-2">
                  {routine.exercise.map((r) => (
                    <div>
                      <h1 className="text-xl">{r.exName && r.exName}</h1>
                      <div className="flex">
                        <p>{r.reps && `${r.reps} reps`}</p>
                        <p className="ml-6">{r.weight && `${r.weight} kg`}</p>
                      </div>
                    </div>
                  ))}
                </p>
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default WorkoutInfo;
