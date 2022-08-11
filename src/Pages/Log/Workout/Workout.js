import React, { useEffect, useState } from 'react';
import Back from '../../../Components/Back';
import Label from '../../../Components/Label';
import Timer from '../../../Components/Timer';
import { useAuthContext } from '../../../Context/AuthContext';
import Footer from '../../../Layouts/Footer/Footer';
import { db } from '../../../Libs/Firebase';
import PreviousSession from './PreviousSession';
import WorkoutDetail from './WorkoutDetail';

function Workout() {
  const { user } = useAuthContext();

  const [currentRoutineId, setCurrentRoutineId] = useState('');
  const [currentRoutine, setCurrentRoutine] = useState([]);

  const [days, setDays] = useState([]);
  const [day, setDay] = useState('Choose a day');
  const [isLoaded, setIsLoaded] = useState(false);
  const [previousSession, setPreviousSession] = useState([]);
  const [previous, setPrevious] = useState(false);
  const [dayLoaded, setDayLoaded] = useState(false);

  //timer
  const [time, setTime] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    //

    try {
      //
      db.collection('users')
        .doc(user.uid)
        .get()
        .then((doc) => {
          setCurrentRoutineId(doc.data().currentRoutineId);

          db.collection('routines')
            .doc(doc.data().currentRoutineId)
            .collection('days')
            .orderBy('day')
            .onSnapshot((snapshot) => {
              setDays(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(),
                }))
              );
            });

          //get exercises by day
        });

      setIsLoaded(true);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  /**
   * UseEffect for change days
   */

  useEffect(() => {
    try {
      //
      db.collection('workouts')
        .doc(user.uid)
        .collection('workouts')
        .orderBy('created', 'desc')
        .where('dayName', '==', day)
        .limit(1)
        .onSnapshot((snapshot) => {
          setPreviousSession(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } catch (error) {
      console.log(error.message);
    }

    setDayLoaded(true);
  }, [day]);

  return (
    <>
      {dayLoaded && previous && (
        <PreviousSession
          previousSession={previousSession}
          setPrevious={setPrevious}
          previous={previous}
        />
      )}

      <div className=" ">
        <Back />
        <div className="mx-12">
          <Timer
            time={time}
            setTime={setTime}
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

        <div className="text-white-950">
          {currentRoutineId && currentRoutine.name}
        </div>

        <div className="mx-12">
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
                days.map(({ id, data }) => (
                  <option value={id}>{data.dayName}</option>
                ))}
            </select>
          </form>
        </div>

        {day && (
          <div className="text-white-950 mt-4 mx-12">
            <button
              onClick={() => setPrevious(true)}
              className="bg-blue-950 w-full rounded-md flex items-center justify-center py-2"
            >
              Previous {day}
            </button>
          </div>
        )}

        {isLoaded &&
          days.map(
            (e) =>
              e.name === day && (
                <WorkoutDetail
                  days={e}
                  seconds={seconds}
                  setSeconds={setSeconds}
                  minutes={minutes}
                  setMinutes={setMinutes}
                  hours={hours}
                  setHours={setHours}
                  isActive={isActive}
                  setIsActive={setIsActive}
                />
              )
          )}
      </div>

      <Footer />
    </>
  );
}

export default Workout;
