import React, { useEffect, useState } from 'react';
import Input from '../../../../Components/Input';
import Label from '../../../../Components/Label';
import { db } from '../../../../Libs/Firebase';
import SelectForm from './SelectForm';

function Form2({
  setPage,
  day,
  setDay,
  dayName,
  setDayName,
  exerciseList,
  setExerciseList,
  days,
}) {
  const [exercisesDB, setExercisesDB] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [numEx, setNumEx] = useState(1);
  const [amount, setAmount] = useState(4);

  useEffect(() => {
    //

    //for (var i = 1; i <= days; i++) {}

    console.log(Number(days));

    let unsubscribe;

    unsubscribe = db.collection('exercises').onSnapshot((snapshot) => {
      setExercisesDB(snapshot.docs.map((doc) => doc.data()));
    });

    setIsLoaded(true);

    return unsubscribe;
  }, []);

  return (
    <>
      {[...Array(Number(days))].map((elem, index) => (
        <span className="flex" key={index}>
          dag
        </span>
      ))}

      <div className="mt-6">
        <Label htmlFor={'day'} label="day" />
        <Input
          type={'number'}
          name="day"
          value={day}
          onChange={({ target }) => setDay(target.value)}
          placeholder={'day'}
          id={'day'}
        />
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
      <div onClick={() => setNumEx(2)}>plus</div>
      <button
        className="bg-blue-400 py-2 px-4 rounded-md"
        onClick={() => setPage(1)}
      >
        Back
      </button>
      <button className="bg-blue-400 py-2 px-4 rounded-md" type="submit">
        Next
      </button>
      <div className="mt-24"></div>
    </>
  );
}

export default Form2;
