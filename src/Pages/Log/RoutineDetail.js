import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Back from '../../Components/Back';
import Exercise from '../../Components/Exercises/Exercise';
import Modal from '../../Components/Modal';
import { useAuthContext } from '../../Context/AuthContext';
import Footer from '../../Layouts/Footer/Footer';
import Header from '../../Layouts/Header/Header';
import { db } from '../../Libs/Firebase';
import Routines from './Routines';

function RoutineDetail() {
  let { id } = useParams();

  const [routine, setRoutine] = useState({});
  const { user } = useAuthContext();
  const [openModal, setOpenModal] = useState(false);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    //

    try {
      db.collection('Routines')
        .doc(id)
        .get()
        .then((doc) => setRoutine(doc.data()))
        .then(() => {
          db.collection('Routines')
            .doc(id)
            .collection('Exercises')
            .onSnapshot((snapshot) => {
              setExercises(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  exercise: doc.data(),
                }))
              );
            });
        });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const modal = () => {
    setOpenModal(true);
  };

  const selectRoutine = () => {
    //

    db.collection('users')
      .doc(user.uid)
      .update({
        currentRoutineId: id,
      })
      .then(() => setOpenModal(false));
  };

  return (
    <>
      <Header />

      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          routine={routine}
          selectRoutine={selectRoutine}
        />
      )}

      <Back />

      <div className="mx-12">
        <h1 className="text-white">{routine.name}</h1>

        <div>{routine.days}</div>

        {exercises &&
          exercises.map(({ id, exercise }) => (
            <Exercise key={id} id={id} exercise={exercise} />
          ))}

        <div className="bg-blue-500 rounded-md px-2 mt-6">
          <button className="text-white" onClick={() => modal()}>
            Select this as current routine
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default RoutineDetail;
