import React, { useState } from 'react';
import Input from '../../../Components/Input';
import Label from '../../../Components/Label';
import { BsPlusCircleFill } from 'react-icons/bs';
import { IoMdRemoveCircle } from 'react-icons/io';

function ExerciseLog({ exercise }) {
  const [inputList, setInputList] = useState([
    { reps: '', weight: '', set: 1 },
  ]);

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
                  placeholder="Reps"
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
                    <IoMdRemoveCircle className="text-xl absolute right-24" />
                  </button>
                )}
                {inputList.length - 1 === i && (
                  <button onClick={handleAddClick}>
                    <BsPlusCircleFill className="text-xl absolute right-16" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
        <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
      </div>
    </>
  );
}

export default ExerciseLog;