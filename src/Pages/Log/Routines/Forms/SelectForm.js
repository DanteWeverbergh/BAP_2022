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
          {/* <select
            className="mx-auto w-full rounded-md h-8 bg-white-950"
            name="exName"
            id="exName"
            value={x.exName}
            onChange={(e) => handleInputChange(e, i)}
          >
            {isLoaded &&
              exercisesDB.map((e) => <option value={e.name}> {e.name}</option>)}
          </select> */}

          <Input
            id={'exName'}
            name="exName"
            placeholder={'Exercise'}
            onChange={(e) => handleInputChange(e, i)}
            value={x.exName}
            type="text"
          />

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

            <div className="w-6"></div>
            <div>
              <Label label={'rep range'} htmlFor="repRange" />
              <Input
                type={'number'}
                name="repRange"
                value={x.repRange}
                placeholder="Rep range"
                id={'repRange'}
                onChange={(e) => handleInputChange(e, i)}
              />
            </div>
          </div>

          <div className="text-white-950 flex mt-6">
            {exerciseList.length !== 1 && (
              <div
                className="bg-blue-950 h-8 w-8 rounded-lg flex justify-center items-center mr-2"
                onClick={() => handleRemoveClick(i)}
              >
                -
              </div>
            )}

            <div
              className="bg-blue-950 h-8 w-8 rounded-lg flex justify-center items-center "
              onClick={handleAddClick}
            >
              +
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default SelectForm;
