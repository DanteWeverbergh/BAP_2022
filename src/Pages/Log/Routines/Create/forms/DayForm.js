import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Input from '../../../../../Components/Input';
import Label from '../../../../../Components/Label';

function DayForm({
  days,
  dayForm,
  setDayForm,
  dayList,
  setDayList,
  form,
  setForm,
}) {
  const [exerciseList, setExerciseList] = useState([
    { exerciseName: '', reps: '', sets: '', exercise: '' },
  ]);
  const [dayName, setDayName] = useState('');

  useEffect(() => {
    if (dayList.length !== 0) {
      console.log('al eens ingevuld');
      const listIndex = dayForm - +1;

      console.log('deded', dayList[listIndex]);

      setDayName(dayList[listIndex].dayName);

      setExerciseList(
        exerciseList.map(({ exercise, exerciseName, reps, sets }) => [
          {
            exercise: exercise,
            exerciseName: exerciseName,
            reps: reps,
            sets: sets,
          },
        ])
      );
    }
  }, []);

  const nextDay = () => {
    if (dayName) {
      setDayForm(dayForm + 1);

      const data = {
        day: dayForm,
        dayName: dayName,
        exerciseList: exerciseList,
      };

      console.log('.........', data);

      setDayList([...dayList, data]);

      setDayName('');
      setExerciseList([{ exerciseName: '', reps: '', sets: '', exercise: '' }]);
    } else {
      Swal.fire({
        text: 'Please fill in all the field',
        color: '#F0F6FC',
        background: '#0D1017',
        confirmButtonColor: '#206FEB',
      });
    }
  };

  const overview = () => {
    if (dayName) {
      const data = {
        day: dayForm,
        dayName: dayName,
        exerciseList: exerciseList,
      };

      console.log('.........', data);

      setDayList([...dayList, data]);

      setForm(3);
    } else {
      Swal.fire({
        text: 'Please fill in all the field',
        color: '#F0F6FC',
        background: '#0D1017',
        confirmButtonColor: '#206FEB',
      });
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...exerciseList];
    list[index][name] = value;
    setExerciseList(list);
  };

  const addExercise = () => {
    //

    let newField = { exerciseName: '', reps: '', sets: '', exercise: '' };
    setExerciseList([...exerciseList, newField]);
  };

  const handleRemoveClick = (index) => {
    const list = [...exerciseList];
    list.splice(index, 1);
    setExerciseList(list);
  };

  return (
    <>
      {/**
       * Form
       */}
      <div className="mb-12 mt-12">
        <Label label={'dayName'} htmlFor="dayName" />
        <Input
          placeholder={'Day name'}
          onChange={({ target }) => setDayName(target.value)}
          name="dayName"
          value={dayName}
          type="text"
        />
      </div>

      <div className="">
        {exerciseList.map((input, index) => (
          <div className="mt-12">
            <Label label={'Exercise'} htmlFor="exerciseName" />
            <Input
              placeholder={'Exercise'}
              name="exerciseName"
              value={input.exerciseName}
              type="text"
              onChange={(event) => handleInputChange(event, index)}
            />

            <div className="flex">
              <div>
                <Label label={'sets'} htmlFor="sets" />
                <Input
                  name={'sets'}
                  placeholder={'Sets'}
                  value={input.sets}
                  type="number"
                  onChange={(event) => handleInputChange(event, index)}
                />
              </div>
              <div className="w-6"></div>
              <div>
                <Label label={'Rep Range'} htmlFor="reps" />
                <Input
                  name={'reps'}
                  placeholder={'Rep Range'}
                  value={input.reps}
                  type="text"
                  onChange={(event) => handleInputChange(event, index)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex mt-6 mb-12">
        <div
          className="bg-blue-950 h-8 w-8 rounded-lg flex justify-center items-center"
          onClick={() => handleRemoveClick()}
        >
          -
        </div>
        <div
          className="bg-blue-950 h-8 w-8 rounded-lg flex justify-center items-center ml-2"
          onClick={() => addExercise()}
        >
          +
        </div>
      </div>
      {/**
       * Buttons
       */}
      <div className="bg-blue-950 rounded-lg h-12  flex px-4 items-center justify-center mr-5 mt-5 absolute top-0 right-0">
        {dayForm}/{days}
      </div>
      {parseInt(days) === parseInt(dayForm) ? (
        <div
          className="bg-blue-950 rounded-lg flex justify-center items-center py-2 "
          onClick={() => overview()}
        >
          Overview
        </div>
      ) : (
        <div
          className="bg-blue-950 rounded-lg flex justify-center items-center py-2 "
          onClick={() => nextDay()}
        >
          Next day
        </div>
      )}
    </>
  );
}

export default DayForm;
