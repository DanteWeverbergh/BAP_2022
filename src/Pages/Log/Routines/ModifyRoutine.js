import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';
import Label from '../../../Components/Label';
import ProgressBar from '../../../Components/ProgressBar';
import { useAuthContext } from '../../../Context/AuthContext';
import Footer from '../../../Layouts/Footer/Footer';
import Header from '../../../Layouts/Header/Header';
import { db } from '../../../Libs/Firebase';
import { modifyRoutine } from '../../../Libs/Firestore';
import ExerciseModal from './Forms/ExerciseModal';
import Form1 from './Forms/Form1';
import Form2 from './Forms/Form2';

function ModifyRoutine() {
  const { user } = useAuthContext();
  let { id } = useParams();
  let Navigate = useNavigate();

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

  const [routineDone, setRoutineDone] = useState(false);

  const [docRef, setDocRef] = useState('');

  //modal
  const [exerciseModal, setExerciseModal] = useState(false);
  const [exerciseName, setExerciseName] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const [page, setPage] = useState(1);

  useEffect(() => {
    db.collection('Routines')
      .doc(id)
      .get()
      .then((doc) => {
        setName(doc.data().name);
        setDescription(doc.data().description);
        setDays(doc.data().days);
      });
  }, []);

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

    modifyRoutine(data, id);
  };

  useEffect(() => {
    if (routineDone) {
      Navigate('/log');
    }
  }, [routineDone]);

  useEffect(() => {
    if (page === 2) {
      Navigate(`/log/modify/2/${id}`);
    }
  }, [page]);

  return (
    <>
      <Header />

      {/** *     <ProgressBar page={page} />
       */}

      <div className="text-white-950 mx-12 text-2xl">Modify routine</div>

      <div
        className="text-white-950 mt-6 bg-slate-960 px-4 rounded-md py-2 mx-12"
        onClick={() => setExerciseModal(!exerciseModal)}
      >
        Exercise not in the list? Add the exercise!
      </div>

      {exerciseModal && <ExerciseModal setExerciseModal={setExerciseModal} />}

      <form className="mx-12" method="POST" onSubmit={handleSubmit}>
        <div className="mt-6">
          <Label htmlFor={'name'} label="name" />
          <Input
            type={'text'}
            name="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
            placeholder={'name'}
            id={'name'}
          />
        </div>

        <div className="mt-6">
          <Label htmlFor={'description'} label="description" />
          <Input
            type={'text'}
            name="description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            placeholder={'description'}
            id={'description'}
          />
        </div>

        <div className="mt-6">
          <Label htmlFor={'days'} label="days" />
          <Input
            type={'number'}
            name="days"
            value={days}
            onChange={({ target }) => setDays(target.value)}
            placeholder={'days'}
            id={'days'}
          />
        </div>

        <button
          className="bg-green-950 py-2 px-4 rounded-md w-full text-white-950 mt-12"
          type="submit"
        >
          Update
        </button>
      </form>
      <div className="mx-12">
        <button
          className="bg-blue-950 text-white-950 w-full py-2 rounded-md mt-4"
          onClick={() => setPage(2)}
        >
          Next
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ModifyRoutine;
