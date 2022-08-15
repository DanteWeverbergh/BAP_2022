import React, { useEffect, useState } from 'react';
import Input from '../../../Components/Input';
import Label from '../../../Components/Label';
import { BsPlusCircleFill } from 'react-icons/bs';
import { IoMdRemoveCircle } from 'react-icons/io';
import { logDOM } from '@testing-library/react';
import { MdDone } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

function ExerciseLog({ exercise, setLog, log }) {
  useEffect(() => {}, []);

  const [inputList, setInputList] = useState([{ reps: '', weight: '' }]);
  const [disabled, setDisabled] = useState(false);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { reps: '', weight: '' }]);
  };

  const done = () => {
    setLog([...log, [{ exName: exercise.exName }, ...inputList]]);
    setDisabled(true);
  };

  return (
    <>
      <div className="">
        {inputList.map((x, i) => {
          return (
            <div className="">
              <div className="flex">
                <h2>{}</h2>
                <Input
                  type={'number'}
                  name="reps"
                  placeholder={`reps: ${exercise.repRange}`}
                  value={x.reps}
                  onChange={(e) => handleInputChange(e, i)}
                  disabled={disabled}
                />
                <Input
                  type={'number'}
                  name="weight"
                  placeholder="Weight"
                  value={x.wieght}
                  onChange={(e) => handleInputChange(e, i)}
                  disabled={disabled}
                />
              </div>
              <div className="btn-box">
                {inputList.length !== 1 && (
                  <button
                    className="mr10"
                    onClick={() => handleRemoveClick(i)}
                    disabled={disabled}
                  >
                    <IoMdRemoveCircle className="text-xl text-white-950 mt-2 " />
                  </button>
                )}

                {inputList.length - 1 === i && (
                  <div>
                    <button onClick={handleAddClick} disabled={disabled}>
                      <BsPlusCircleFill className="text-xl text-white-950 absolute right-16" />
                    </button>
                    <button
                      className={
                        !disabled
                          ? 'bg-blue-950 h-8 w-8 rounded-full mt-4 flex items-center justify-center'
                          : 'bg-red-950 h-8 w-8 rounded-full mt-4 flex items-center justify-center'
                      }
                      disabled={disabled}
                      onClick={() => done()}
                    >
                      <MdDone />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {/** 
        <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
        */}
      </div>
    </>
  );
}

export default ExerciseLog;
