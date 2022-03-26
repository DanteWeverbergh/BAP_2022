import React, { useEffect, useState } from 'react';
import Timer from '../../../Components/Timer';
import { useAuthContext } from '../../../Context/AuthContext';
import Footer from '../../../Layouts/Footer/Footer';
import { db } from '../../../Libs/Firebase';

function Workout() {
  const { user } = useAuthContext();

  const [currentRoutineId, setCurrentRoutineId] = useState('');
  const [currentRoutine, setCurrentRoutine] = useState([]);
  const [day, setDay] = useState('');
  const [days, setDays] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [log, setLog] = useState(false);

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
  }, []);

  return (
    <>
      <div className="mt-6">
        <Timer />
      </div>

      <div className="text-white">
        {currentRoutineId && currentRoutine.name}
      </div>

      {/** 

      {!log && (
        <div>
          <form>
            <select
              className="mx-auto w-3/4 rounded-md"
              name="cars"
              id="cars"
              value={day}
              onChange={({ target }) => setDay(target.value)}
            >
              <option value="Push A">Push A</option>
              <option value="Pull A">Pull A</option>
              <option value="Legs A">Legs A</option>
              <option value="Push B">Push B</option>
              <option value="Pull B">Pull B</option>
              <option value="Legs B">Legs B</option>
            </select>
          </form>
        </div>
      )}

      */}

      <div className="text-white">{day}</div>

      <button
        className="bg-blue-500 px-5 py-2 rounded-md"
        onClick={() => setLog(true)}
      >
        Start
      </button>

      <button onClick={() => console.log(days)}>Test</button>

      <div>
        <form>
          <select
            className="mx-auto w-3/4 rounded-md"
            name="cars"
            id="cars"
            value={day}
            onChange={({ target }) => setDay(target.value)}
          >
            {isLoaded &&
              days.map((d) => <option value={d.name}>{d.name}</option>)}
          </select>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Workout;
