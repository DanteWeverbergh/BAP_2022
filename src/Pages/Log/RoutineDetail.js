import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../Layouts/Footer/Footer';
import Header from '../../Layouts/Header/Header';
import { db } from '../../Libs/Firebase';

function RoutineDetail() {
  let { id } = useParams();

  const [routine, setRoutine] = useState({});

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

  return (
    <>
      <Header />
      <div className="mx-12">
        <div>RoutineDetail</div>
        <h1 className="text-white">{routine.name}</h1>
      </div>
      <Footer />
    </>
  );
}

export default RoutineDetail;
