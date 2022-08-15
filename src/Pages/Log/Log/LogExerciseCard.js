import { array } from 'prop-types';
import React, { useEffect, useState } from 'react';
import Input from '../../../Components/Input';
import Label from '../../../Components/Label';

function LogExerciseCard({ id, data, workout, setWorkout }) {
  const [sets, setSets] = useState(data.sets);
  const test = [1, 2, 3];
  const [inputList, setInputList] = useState([{ reps: '', weight: '' }]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    // let newField = { reps: '', weight: '' };
    // [...Array(4)].map(() => setInputList([...inputList, newField]));

    setInputList([...Array(data.sets)].map(() => ({ reps: '', weight: '' })));
  }, []);

  const addSet = () => {
    //
    setSets((data.sets += 1));
    let newField = { reps: '', weight: '' };
    setInputList([...inputList, newField]);
  };

  const handleRemoveClick = (index) => {
    setSets((data.sets -= 1));

    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const save = () => {
    setDisabled(true);

    setWorkout([...workout, [{ exercise: data.exerciseName }, ...inputList]]);
  };

  return (
    <>
      <div className="text-white-950 mx-12 mb-12">
        <h1 className="font-bold text-xl mb-2">{data.exerciseName}</h1>
        <div className="text-white-950">
          <div>
            <form>
              {inputList.map((input, index) => (
                <div key={index}>
                  <div className="flex mb-4" key={index}>
                    <Input
                      type={'number'}
                      name={'reps'}
                      value={input.reps}
                      placeholder={data.reps ? data.reps : 'reps'}
                      disabled={disabled}
                      className={
                        disabled
                          ? 'bg-white-960 border-none shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          : 'bg-white-950 border-none shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      }
                      onChange={(event) => handleInputChange(event, index)}
                    />
                    <div className="w-6"></div>
                    <Input
                      type={'number'}
                      name={'weight'}
                      value={input.weight}
                      placeholder={'weight'}
                      disabled={disabled}
                      className={
                        disabled
                          ? 'bg-white-960 border-none shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          : 'bg-white-950 border-none shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      }
                      onChange={(event) => handleInputChange(event, index)}
                    />
                  </div>
                </div>
              ))}
            </form>
          </div>
        </div>

        <div>
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
                onClick={() => handleRemoveClick()}
              >
                -
              </div>
            </div>
            <div
              className="bg-blue-950 h-8 flex items-center px-4 rounded-lg"
              onClick={() => save()}
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
