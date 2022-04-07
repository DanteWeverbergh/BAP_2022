import React, { useEffect, useState } from 'react';
import Input from '../../../Components/Input';
import Label from '../../../Components/Label';
import { BsPlusCircleFill } from 'react-icons/bs';
import { IoMdRemoveCircle } from 'react-icons/io';
import { logDOM } from '@testing-library/react';
import { MdDone } from 'react-icons/md';

function ExerciseLog({ exercise, setLog, log }) {
  useEffect(() => {
    console.log(exercise.exName);
  }, []);

  const [inputList, setInputList] = useState([{ reps: '', weight: '' }]);

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

  return (
    <>
      <div className="">
        {inputList.map((x, i) => {
          return (
            <div className="">
              <div className="flex">
                <h2>{}</h2>
                <Input
                  name="reps"
                  placeholder={`reps: ${exercise.repRange}`}
                  value={x.reps}
                  onChange={(e) => handleInputChange(e, i)}
                />
                <Input
                  name="weight"
                  placeholder="Weight"
                  value={x.wieght}
                  onChange={(e) => handleInputChange(e, i)}
                />
              </div>
              <div className="btn-box">
                {inputList.length !== 1 && (
                  <button className="mr10" onClick={() => handleRemoveClick(i)}>
                    <IoMdRemoveCircle className="text-xl text-white-950 absolute right-24" />
                  </button>
                )}
                {inputList.length - 1 === i && (
                  <div>
                    <button onClick={handleAddClick}>
                      <BsPlusCircleFill className="text-xl text-white-950 absolute right-16" />
                    </button>
                    <button
                      className="bg-blue-950 h-8 w-8 rounded-full mt-4 flex items-center justify-center"
                      onClick={() =>
                        setLog([...log, [exercise.exName, ...inputList]])
                      }
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
