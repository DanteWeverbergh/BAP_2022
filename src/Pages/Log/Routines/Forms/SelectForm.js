import React, { useEffect } from 'react';
import Input from '../../../../Components/Input';
import Label from '../../../../Components/Label';
import { BsPlusCircleFill } from 'react-icons/bs';
import { IoMdRemoveCircle } from 'react-icons/io';

function SelectForm({ isLoaded, exercisesDB, exerciseList, setExerciseList }) {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...exerciseList];
    list[index][name] = value;
    setExerciseList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...exerciseList];
    list.splice(index, 1);
    setExerciseList(list);
  };

  const handleAddClick = () => {
    setExerciseList([...exerciseList, { exName: '', sets: '', repRange: '' }]);
  };

  return (
    <>
      {exerciseList.map((x, i) => (
        <div className="mt-8">
          <Label label={'Exercise'} htmlFor="exName" />
          <select
            className="mx-auto w-full roounded-md"
            name="exName"
            id="exName"
            value={x.exName}
            onChange={(e) => handleInputChange(e, i)}
          >
            {isLoaded &&
              exercisesDB.map((e) => <option value={e.name}> {e.name}</option>)}
          </select>

          <div className="flex mt-4">
            <div>
              <Label label={'sets'} htmlFor="sets" />
              <Input
                type={'number'}
                name="sets"
                value={x.sets}
                placeholder="sets"
                id={'sets'}
                onChange={(e) => handleInputChange(e, i)}
              />
            </div>

            <div>
              <Label label={'rep range'} htmlFor="repRange" />
              <Input
                type={'text'}
                name="repRange"
                value={x.repRange}
                placeholder="Rep range"
                id={'repRange'}
                onChange={(e) => handleInputChange(e, i)}
              />
            </div>
          </div>

          <div className="btn-box">
            {exerciseList.length !== 1 && (
              <button className="mr10" onClick={() => handleRemoveClick(i)}>
                <IoMdRemoveCircle className="text-xl absolute right-24" />
              </button>
            )}
            {exerciseList.length - 1 === i && (
              <button onClick={handleAddClick}>
                <BsPlusCircleFill className="text-xl absolute right-16" />
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default SelectForm;
