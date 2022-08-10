import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../../../Libs/Firebase';
import DayHeader from './DayHeader';
import ExerciseCard from './ExerciseCard';

function DayDetail() {
  let { id, dayid } = useParams();
  const [day, setDay] = useState({});
  const [exercises, setExercises] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  console.log('id', id);
  console.log('day', dayid);

  useEffect(() => {
    db.collection('routines')
      .doc(id)
      .collection('days')
      .doc(dayid)
      .get()
      .then((doc) => {
        setDay(doc.data());
      });

    db.collection('routines')
      .doc(id)
      .collection('days')
      .doc(dayid)
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

    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded && (
        <>
          <div className="text-white-950">
            <DayHeader day={day} />

            {exercises.map(({ id, data }) => (
              <ExerciseCard key={id} id={id} data={data} />
            ))}
          </div>

          <div className="mx-12 fixed inset-x-0 bottom-0 mb-12">
            <button
              className="bg-blue-950 w-full py-2 px-4 rounded-lg text-white-950"
              onClick={() => console.log('start workout')}
            >
              Start workout
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default DayDetail;
