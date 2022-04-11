import React, { useEffect, useState } from 'react';
import Input from '../../../../Components/Input';
import Label from '../../../../Components/Label';
import { db } from '../../../../Libs/Firebase';
import DaySelect from './DaySelect';
import SelectForm from './SelectForm';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../Layouts/Header/Header';
import Footer from '../../../../Layouts/Footer/Footer';
import ExerciseModal from './ExerciseModal';
import { modifyDayRoutine } from '../../../../Libs/Firestore';

function Modify() {
  let { id } = useParams();
  let Navigate = useNavigate();

  const [days, setDays] = useState(2);

  const [exercisesDB, setExercisesDB] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [numEx, setNumEx] = useState(1);
  const [amount, setAmount] = useState(4);

  //modal
  const [exerciseModal, setExerciseModal] = useState(false);
  const [exerciseName, setExerciseName] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

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
  const [dayId, setDayId] = useState('');

  useEffect(() => {
    //

    //for (var i = 1; i <= days; i++) {}
    let unmounted = false;

    db.collection('exercises')
      .orderBy('name')
      .onSnapshot((snapshot) => {
        if (!unmounted) {
          setExercisesDB(snapshot.docs.map((doc) => doc.data()));
        }
      });

    //get current routine form firestore

    db.collection('Routines')
      .doc(id)
      .collection('Exercises')
      .onSnapshot((snapshot) => {
        console.log('/**/*/*/*/*');
        setDays(snapshot.docs.length);
      });

    setIsLoaded(true);

    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    //
    db.collection('Routines')
      .doc(id)
      .collection('Exercises')
      .where('day', '==', day)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setDayName(doc.data().name);
          setDayId(doc.id);

          setExerciseList(
            doc.data().Exercises.map((ex) => ({
              exName: ex.exName,
              sets: ex.sets,
              repRange: ex.repRange,
            }))
          );

          /*
          doc.data().Exercises.map((ex) => {
            setExerciseList([
              { exName: ex.exName, sets: ex.sets, repRange: ex.repRange },
              { exName: ex.exName, sets: ex.sets, repRange: ex.repRange },
            ]);
          });
          */
        });
      });
  }, [day]);

  useEffect(() => {
    if (routineDone) {
      Navigate('/log');
    }
  }, [routineDone]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      day: day,
      dayName: dayName,
      Exercises: exerciseList,
    };

    modifyDayRoutine(data, id, setRoutineDone, day, days, dayId);
  };

  return (
    <>
      <Header />

      <div
        className="text-white-950 mt-6 bg-slate-960 px-4 rounded-md py-2 mx-12"
        onClick={() => setExerciseModal(!exerciseModal)}
      >
        Exercise not in the list? Add the exercise!
      </div>

      {exerciseModal && <ExerciseModal setExerciseModal={setExerciseModal} />}

      <button
        className="ml-6 mt-6 bg-white-950 flex items-center justify-center text-slate-950 h-12 w-12 py-2 px-4 rounded-full"
        onClick={() => Navigate(`/log/modify/${id}`)}
      >
        <IoArrowBack className="text-slate-950 text-2xl" />
      </button>

      <form className="mx-12" onSubmit={handleSubmit}>
        <div className="mt-8">
          <Label label={'day'} htmlFor="day" />
          <select
            className="mx-auto w-full bg-white-950 rounded-md  h-8"
            name="day"
            value={day}
            onChange={({ target }) => setDay(target.value)}
          >
            {[...Array(Number(days))].map((elem, index) => (
              <option value={(index += 1)}>
                {index}/{days}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <Label htmlFor={'dayName'} label="day name" />
          <Input
            type={'text'}
            name="dayName"
            value={dayName}
            onChange={({ target }) => setDayName(target.value)}
            placeholder={'dayName'}
            id={'dayName'}
          />
        </div>
        <SelectForm
          isLoaded={isLoaded}
          exercisesDB={exercisesDB}
          exerciseList={exerciseList}
          setExerciseList={setExerciseList}
        />

        <button
          className="mt-12 bg-blue-950 text-white-950 w-full py-2 px-4 rounded-md"
          type="submit"
        >
          update
        </button>
      </form>

      <div className="mx-12">
        <button
          className="bg-green-950  w-full mt-6 text-white-950 py-2 rounded-md"
          onClick={() => setRoutineDone(true)}
        >
          Done
        </button>
      </div>

      <div className="mt-24"></div>

      <Footer />
    </>
  );
}

export default Modify;
