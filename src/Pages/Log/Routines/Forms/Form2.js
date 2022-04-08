import React, { useEffect, useState } from 'react';
import Input from '../../../../Components/Input';
import Label from '../../../../Components/Label';
import { db } from '../../../../Libs/Firebase';
import DaySelect from './DaySelect';
import SelectForm from './SelectForm';
import { IoArrowBack } from 'react-icons/io5';

function Form2({
  setPage,
  day,
  setDay,
  dayName,
  setDayName,
  exerciseList,
  setExerciseList,
  days,
  docRef,
  setDocRef,
}) {
  const [exercisesDB, setExercisesDB] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [numEx, setNumEx] = useState(1);
  const [amount, setAmount] = useState(4);

  useEffect(() => {
    //

    //for (var i = 1; i <= days; i++) {}

    let unsubscribe;

    unsubscribe = db.collection('exercises').onSnapshot((snapshot) => {
      setExercisesDB(snapshot.docs.map((doc) => doc.data()));
    });

    setIsLoaded(true);

    return unsubscribe;
  }, []);

  const test = () => {
    //
    console.log(Number(day));
  };

  return (
    <>
      <button
        className="mt-6 bg-white-950 flex items-center justify-center text-slate-950 h-12 w-12 py-2 px-4 rounded-full"
        onClick={() => setPage(1)}
      >
        <IoArrowBack className="text-slate-950 text-2xl" />
      </button>
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
        Next
      </button>

      <div className="mt-24"></div>
    </>
  );
}

export default Form2;
