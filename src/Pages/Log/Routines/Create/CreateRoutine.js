import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Back from '../../../../Components/Back';
import Button from '../../../../Components/Button';
import { useAuthContext } from '../../../../Context/AuthContext';
import { db } from '../../../../Libs/Firebase';
import DayForm from './forms/DayForm';
import RoutineForm from './forms/RoutineForm';
import Overview from './Overview/Overview';

function CreateRoutine() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [form, setForm] = useState(1);

  //form 1
  const [routineName, setRoutineName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [days, setDays] = useState('');
  const [dayForm, setDayForm] = useState('');

  const [dayList, setDayList] = useState('');

  const handleOnSubmit = (e) => {
    e.preventDefault();

    console.log('submit form', dayList);

    // add routine to db

    try {
      const routineData = {
        days,
        name: routineName,
        shortDescription,
        uid: user.uid,
      };

      // add routine
      db.collection('routines')
        .add(routineData)
        .then((rId) => {
          // add all the days to the routine
          const routineId = rId.id;

          dayList.map(({ day, dayName, exerciseList }) => {
            const dayData = {
              day,
              dayName,
            };

            console.log('daaaag', routineId);

            db.collection('routines')
              .doc(routineId)
              .collection('days')
              .add(dayData)
              .then((dId) => {
                const dayId = dId.id;
                console.log('koeken');
                //add exercises to firestore
                exerciseList.map(({ exercise, exerciseName, reps, sets }) => {
                  const exerciseData = {
                    exercise,
                    exerciseName,
                    reps,
                    sets,
                  };
                  console.log(exerciseData);
                  db.collection('routines')
                    .doc(routineId)
                    .collection('days')
                    .doc(dayId)
                    .collection('exercises')
                    .add(exerciseData);
                });
              });
          });
        })
        .then(() => {
          navigate('/log');
        });

      //db.collection('routines').add(routineData);
    } catch (error) {
      console.log(error);
    }
  };

  const back = () => {
    let prev = dayForm;
    setDayForm((prev -= 1));
  };

  const backOverview = () => {
    setForm(2);
    setDayForm(parseInt(days));
  };

  return (
    <>
      <div className="text-white-950">
        {form === 1 && <Back />}
        {form === 2 && dayForm === 1 && (
          <div
            className="m-5 h-12 w-12 bg-blue-950  flex justify-center  items-center rounded-full"
            onClick={() => setForm(1)}
          >
            <IoArrowBack className="text-white-950 text-2xl" />
          </div>
        )}

        {parseInt(form) === 2 && parseInt(dayForm) !== 1 && (
          <div
            className="m-5 h-12 w-12 bg-blue-950  flex justify-center  items-center rounded-full"
            onClick={() => back()}
          >
            <IoArrowBack className="text-white-950 text-2xl" />
          </div>
        )}

        {/*
        
        
        form === 3 && (
          <div
            className="m-5 h-12 w-12 bg-blue-950  flex justify-center  items-center rounded-full"
            onClick={() => backOverview()}
          >
            <IoArrowBack className="text-white-950 text-2xl" />
          </div>
        )
    
    
        */}

        {form === 3 && <Back />}

        <div className="mx-12">
          <form onSubmit={handleOnSubmit}>
            {form === 1 && (
              <RoutineForm
                form={form}
                setForm={setForm}
                routineName={routineName}
                setRoutineName={setRoutineName}
                shortDescription={shortDescription}
                setShortDescription={setShortDescription}
                days={days}
                setDays={setDays}
                setDayForm={setDayForm}
              />
            )}
            {form === 2 && (
              <DayForm
                form={form}
                setForm={setForm}
                days={days}
                dayForm={dayForm}
                setDayForm={setDayForm}
                dayList={dayList}
                setDayList={setDayList}
              />
            )}

            {form === 3 && (
              <Overview
                routineName={routineName}
                setRoutineName={setRoutineName}
                shortDescription={shortDescription}
                setShortDescription={setShortDescription}
                days={days}
                setDays={setDays}
                dayList={dayList}
                setDayList={setDayList}
              />
            )}

            <Button text={'Create routine'} />
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateRoutine;
