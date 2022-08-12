import { array } from 'prop-types';
import React, { useEffect, useState } from 'react';
import Input from '../../../Components/Input';
import Label from '../../../Components/Label';

function LogExerciseCard({ id, data, workout, setWorkout }) {
  const [sets, setSets] = useState(data.sets);
  const [inputList, setInputList] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let newField = { reps: '', weight: '' };

    [...Array(4)].map(() => setInputList([...inputList, newField]));
  }, []);

  const test = () => {
    console.log(inputList);
  };

  const addSet = () => {
    //
    setSets((data.sets += 1));
    let newField = { reps: '', weight: '' };
    setInputList([...inputList, newField]);
  };

  return (
    <>
      <div className="text-white-950 mx-12 mb-12">
        <h1 className="font-bold text-xl mb-2">{data.exerciseName}</h1>
        <div>
          {/* <div className="flex">
            <div className="block text-white-950  text-sm font-bold mb-2 mt-4">
              Sets
            </div>
            <div className="block ml-1/2 text-white-950  text-sm font-bold mb-2 mt-4">
              Reps
            </div>
          </div> */}
          {[...Array(sets)].map((elem, index) => (
            <div className="flex mb-4" key={index}>
              <Input
                type={'number'}
                name={'reps'}
                placeholder={data.reps}
                onChange={({ target }) => setWorkout(target.value)}
                disabled={disabled ? true : false}
              />
              <div className="w-6"></div>
              <Input
                type={'number'}
                name={'weight'}
                placeholder={'weight'}
                onChange={({ target }) => setWorkout([...workout, 'jkkllkjj'])}
                disabled={disabled ? true : false}
              />
            </div>
          ))}
          <div className="flex justify-between">
            <div className="flex">
              <div
                className="bg-blue-950 h-8 w-8 rounded-lg flex justify-center items-center"
                onClick={() => addSet()}
              >
                +
              </div>
              <div
                className="bg-blue-950 h-8 w-8 rounded-lg flex justify-center items-center ml-2"
                onClick={() => setSets((data.sets -= 1))}
              >
                -
              </div>
            </div>
            <div
              className="bg-blue-950 h-8 flex items-center px-4 rounded-lg"
              onClick={() => setDisabled(!disabled)}
            >
              Save
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogExerciseCard;
