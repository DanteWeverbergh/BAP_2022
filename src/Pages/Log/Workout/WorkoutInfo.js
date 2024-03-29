import React, { useEffect, useState } from 'react';
import { IoIosFitness } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../Context/AuthContext';
import Footer from '../../../Layouts/Footer/Footer';
import Header from '../../../Layouts/Header/Header';
import { db } from '../../../Libs/Firebase';
import { IoArrowBack } from 'react-icons/io5';
import Back from '../../../Components/Back';

function WorkoutInfo() {
  let { id } = useParams();
  const { user } = useAuthContext();

  const [workout, setWorkout] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    //

    let mounted = false;

    try {
      db.collection('workouts')
        .doc(user.uid)
        .collection('workouts')
        .doc(id)
        .get()
        .then((doc) => {
          if (!mounted) {
            setWorkout(doc.data());

            console.log(doc.data());

            setRoutine(doc.data().log.map((exercise) => exercise));
          }
        });

      setIsLoaded(true);
    } catch (error) {
      console.log(error.message);
    }

    return () => {
      mounted = true;
    };
  }, []);

  return (
    <>
      <Header />

      <Back link={'/log'} />

      <div className="text-white-950 mx-12">
        <div className="">
          <h1 className="text-2xl font-semibold">
            {isLoaded && workout.dayName}
          </h1>
          <p>{isLoaded && workout.time}</p>
        </div>

        <div>
          {isLoaded &&
            routine.map((routine) => (
              <div key={id}>
                {/**
                <h1>{routine.exercise[0].exName}</h1>
                 */}
                <div className="mt-6  py-2">
                  {routine.exercise.map((r) => (
                    <div>
                      <h1 className="text-xl font-bold">
                        {r.exercise && r.exercise}
                      </h1>
                      <div className="flex">
                        <p>{r.reps && `${r.reps} reps`}</p>
                        <p className="ml-6">{r.weight && `${r.weight} kg`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default WorkoutInfo;
