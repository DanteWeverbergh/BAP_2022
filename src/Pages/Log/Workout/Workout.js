import React, { useEffect, useState } from 'react';
import Label from '../../../Components/Label';
import Timer from '../../../Components/Timer';
import { useAuthContext } from '../../../Context/AuthContext';
import Footer from '../../../Layouts/Footer/Footer';
import { db } from '../../../Libs/Firebase';
import WorkoutDetail from './WorkoutDetail';

function Workout() {
  const { user } = useAuthContext();

  const [currentRoutineId, setCurrentRoutineId] = useState('');
  const [currentRoutine, setCurrentRoutine] = useState([]);

  const [days, setDays] = useState([]);
  const [day, setDay] = useState('Choose a day');
  const [isLoaded, setIsLoaded] = useState(false);

  const [log, setLog] = useState(false);

  const [time, setTime] = useState('');

  useEffect(() => {
    //

    try {
      //
      db.collection('users')
        .doc(user.uid)
        .get()
        .then((doc) => {
          setCurrentRoutineId(doc.data().currentRoutineId);

          db.collection('Routines')
            .doc(doc.data().currentRoutineId)
            .collection('Exercises')
            .onSnapshot((snapshot) => {
              setDays(snapshot.docs.map((ex) => ex.data()));
            });
        });

      setIsLoaded(true);
    } catch (error) {
      alert(error.message);
    }

    console.log(days);
  }, []);

  return (
    <>
      <div className="mx-12">
        <div className="mt-6">
          <Timer time={time} setTime={setTime} />
        </div>

        <div className="text-white-950">
          {currentRoutineId && currentRoutine.name}
        </div>

        <div>
          <form>
            <Label label={'select your day'} />
            <select
              className="mx-auto w-full h-8 rounded-md"
              name="days"
              id="days"
              value={day}
              onChange={({ target }) => setDay(target.value)}
            >
              <option value={''}>{''}</option>
              {isLoaded &&
                days.map((d) => <option value={d.name}>{d.name}</option>)}
            </select>
          </form>
        </div>

        {/**
        <button
          className="bg-blue-500 px-5 py-2 rounded-md"
          onClick={() => setLog(true)}
        >
          Start
        </button>
        <button
          className="bg-blue-500 px-5 py-2 rounded-md"
          onClick={() => setLog(false)}
        >
          Stop
        </button>
         */}
        {isLoaded &&
          days.map(
            (e) => e.name === day && <WorkoutDetail days={e} time={time} />
          )}
      </div>

      <Footer />
    </>
  );
}

export default Workout;
