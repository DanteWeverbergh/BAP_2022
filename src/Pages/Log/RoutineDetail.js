import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Back from '../../Components/Back';
import Exercise from '../../Components/Exercises/Exercise';
import VideoModal from '../../Components/Exercises/VideoModal';
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

  const [videoModal, setVideoModal] = useState(false);
  const [ytId, setYtId] = useState('');

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

      {videoModal && <VideoModal setVideoModal={setVideoModal} ytId={ytId} />}

      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          routine={routine}
          selectRoutine={selectRoutine}
        />
      )}
      <Back link={'/log'} />
      <div className="mx-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-white-950">{routine.name}</h1>

          <div className="text-white-950 bg-blue-950 h-12 w-12 rounded-full flex items-center justify-center">
            {routine.days}
          </div>
        </div>

        {exercises &&
          exercises.map(({ id, exercise }) => (
            <Exercise
              key={id}
              id={id}
              exercise={exercise}
              setVideoModal={setVideoModal}
              setYtId={setYtId}
            />
          ))}

        <div className="bg-blue-950 rounded-md px-2 mt-6 ">
          <button className="text-white-950" onClick={() => modal()}>
            Select this as current routine
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RoutineDetail;
