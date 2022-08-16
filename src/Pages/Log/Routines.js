import { doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import { db } from '../../Libs/Firebase';
import AllRoutines from './Routines/AllRoutines';
import CurrentRoutine from './Routines/CurrentRoutine';

function Routines({ u }) {
  const [routines, setRoutines] = useState([]);
  const { user } = useAuthContext();
  const [currentRoutineId, setCurrentRoutineId] = useState('');
  const navigate = useNavigate();

  //search

  useEffect(() => {
    //

    let mounted = false;

    db.collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        setCurrentRoutineId(doc.data().currentRoutineId);
      });

    db.collection('routines').onSnapshot((snapshot) => {
      if (!mounted) {
        setRoutines(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            routine: doc.data(),
          }))
        );
      }
    });

    return () => {
      mounted = true;
    };
  }, []);

  return (
    <>
      {currentRoutineId && <CurrentRoutine />}
      <div className="mx-12 mt-6">
        <div
          className="text-white-950 bg-blue-950 py-2 flex items-center justify-center rounded-lg"
          onClick={() => navigate('/create/routine')}
        >
          Create routine
        </div>
      </div>
      <AllRoutines />
    </>
  );
}

export default Routines;
