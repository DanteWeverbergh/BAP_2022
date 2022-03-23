import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import Footer from '../../Layouts/Footer/Footer';
import Header from '../../Layouts/Header/Header';
import { db } from '../../Libs/Firebase';

function RoutineDetail() {
  let { id } = useParams();

  const [routine, setRoutine] = useState({});
  const { user } = useAuthContext();

  useEffect(() => {
    //

    try {
      db.collection('Routines')
        .doc(id)
        .get()
        .then((doc) => setRoutine(doc.data()));
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const selectRoutine = () => {
    //

    db.collection('users')
      .doc(user.uid)
      .update({
        currentRoutineId: id,
      })
      .then(() => alert('succes!'));
  };

  return (
    <>
      <Header />
      <div className="mx-12">
        <div>RoutineDetail</div>
        <h1 className="text-white">{routine.name}</h1>

        <div className="bg-blue-500 rounded-md px-2 mt-6">
          <button className="text-white" onClick={() => selectRoutine()}>
            Select this as current routine
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default RoutineDetail;
