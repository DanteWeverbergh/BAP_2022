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
  sets,
  setSets,
  repRange,
  setRepRange,
  exName,
  setExName,
}) {
  const [exercisesDB, setExercisesDB] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [numEx, setNumEx] = useState(1);

  const [exerciseList, setExerciseList] = useState([
    {
      day: '',
      name: '',
      exercises: [],
    },
  ]);

  useEffect(() => {
    //

    let unsubscribe;

    unsubscribe = db.collection('exercises').onSnapshot((snapshot) => {
      setExercisesDB(snapshot.docs.map((doc) => doc.data()));
    });

    setIsLoaded(true);

    return unsubscribe;
  }, []);

  return (
    <>
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
        sets={sets}
        setSets={setSets}
        repRange={repRange}
        setRepRange={setRepRange}
        exName={exName}
        setExName={setExName}
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
    </>
  );
}

export default Form2;
