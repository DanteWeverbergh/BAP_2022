import React, { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import Back from '../../../Components/Back';
import Timer from '../../../Components/Timer';
import { useAuthContext } from '../../../Context/AuthContext';
import { db } from '../../../Libs/Firebase';
import { logWorkout } from '../../../Libs/Firestore';
import LogExerciseCard from './LogExerciseCard';

function LogWorkout() {
  let { routineId, dayId } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const [day, setDay] = useState('');

  const [workout, setWorkout] = useState([]);

  //timer
  const [time, setTime] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    //
    console.log('routineId', routineId);
    console.log(dayId);

    //get the exercises
    db.collection('routines')
      .doc(routineId)
      .collection('days')
      .doc(dayId)
      .collection('exercises')
      .orderBy('exercise')
      .onSnapshot((snapshot) => {
        setExercises(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

    db.collection('routines')
      .doc(routineId)
      .collection('days')
      .doc(dayId)
      .get()
      .then((doc) => {
        setDay(doc.data().dayName);
      });

    setisLoaded(true);
  }, []);

  const saveWorkout = () => {
    //workout reps & weight
    console.log('workout:', workout);

    //time
    console.log('time:', `${hours}:${minutes}:${seconds}`);

    const timer = `${hours}:${minutes}:${seconds}`;
    //stop timer
    setIsActive(false);

    logWorkout(user, day, workout, timer);
  };

  const addExercise = () => {
    //
  };

  return (
    <>
      <div className="bg-slate-950 pb-2 fixed w-full">
        <div className="flex justify-between">
          <div
            className="m-5 h-12 w-12 bg-blue-950  flex justify-center  items-center rounded-full"
            onClick={() => navigate(-1)}
          >
            <IoArrowBack className="text-white-950 text-2xl" />
          </div>

          <div
            className="text-white-950 bg-blue-950 px-4 py-2 rounded-lg m-5 flex items-center  "
            onClick={() => console.log('last session')}
          >
            Last session
          </div>
        </div>
        <div className="mx-12">
          <Timer
            seconds={seconds}
            setSeconds={setSeconds}
            minutes={minutes}
            setMinutes={setMinutes}
            hours={hours}
            setHours={setHours}
            isActive={isActive}
            setIsActive={setIsActive}
          />
        </div>
      </div>

      <div className="h-64">jhhjlh</div>

      <div>
        {isLoaded &&
          exercises.map(({ id, data }) => (
            <LogExerciseCard
              key={id}
              id={id}
              data={data}
              workout={workout}
              setWorkout={setWorkout}
            />
          ))}

        <div className="text-white-950 mx-12 mb-12 bg-green-950 rounded-lg py-2 flex items-center justify-center" onClick={() => addExercise()}>
          add Exercise
        </div>

        <div className="mx-12 mb-12">
          <button
            className="bg-blue-950 text-white-950 w-full py-2 rounded-lg"
            onClick={() => saveWorkout()}
          >
            Save workout
          </button>
        </div>
      </div>
    </>
  );
}

export default LogWorkout;
