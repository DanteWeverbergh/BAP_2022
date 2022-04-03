import React, { useState } from 'react';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';
import Label from '../../../Components/Label';
import ProgressBar from '../../../Components/ProgressBar';
import { useAuthContext } from '../../../Context/AuthContext';
import Footer from '../../../Layouts/Footer/Footer';
import Header from '../../../Layouts/Header/Header';
import { db } from '../../../Libs/Firebase';
import { addDayToRoutine, addRoutine } from '../../../Libs/Firestore';
import ExerciseModal from './Forms/ExerciseModal';
import Form1 from './Forms/Form1';
import Form2 from './Forms/Form2';

function CreateRoutine() {
  const { user } = useAuthContext();

  //states all form pages
  const [days, setDays] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  //form 2
  const [day, setDay] = useState('1');
  const [dayName, setDayName] = useState('');

  const [exerciseList, setExerciseList] = useState([
    {
      exName: '',
      sets: '',
      repRange: '',
    },
  ]);

  const [docRef, setDocRef] = useState('');

  //modal
  const [exerciseModal, setExerciseModal] = useState(false);
  const [exerciseName, setExerciseName] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const [page, setPage] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      description,
      days,
      creator: user.uid,
    };
    const dataa = {
      day,
      name: dayName,
      Exercises: exerciseList,
    };

    if (day === '1') {
      try {
        await db
          .collection('Routines')
          .add(data)
          .then((docRef) => {
            db.collection('Routines')
              .doc(docRef.id)
              .collection('Exercises')
              .add(dataa);
            setDocRef(docRef.id);
            //reset al fields
            setDayName('');
            setExerciseList([
              {
                exName: '',
                sets: '',
                repRange: '',
              },
            ]);
          });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      addDayToRoutine(dataa, docRef);
    }
  };

  return (
    <>
      <Header />
      {docRef}

      <ProgressBar page={page} />

      <div className="text-white mx-12 text-2xl">Create a new routine</div>

      <div
        className="text-white mx-12"
        onClick={() => setExerciseModal(!exerciseModal)}
      >
        Exercise not in the list? Add the exercise!
      </div>

      {exerciseModal && <ExerciseModal />}

      <form className="mx-12" method="POST" onSubmit={handleSubmit}>
        {page === 1 && (
          <Form1
            days={days}
            setDays={setDays}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            setPage={setPage}
          />
        )}

        {page === 2 && (
          <Form2
            setPage={setPage}
            days={days}
            day={day}
            setDay={setDay}
            dayName={dayName}
            setDayName={setDayName}
            exerciseList={exerciseList}
            setExerciseList={setExerciseList}
            docRef={docRef}
            setDocRef={setDocRef}
          />
        )}
      </form>

      <Footer />
    </>
  );
}

export default CreateRoutine;
