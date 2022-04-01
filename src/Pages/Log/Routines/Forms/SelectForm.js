import React from 'react';
import Input from '../../../../Components/Input';
import Label from '../../../../Components/Label';

function SelectForm({
  isLoaded,
  exercisesDB,
  sets,
  setSets,
  repRange,
  setRepRange,
  exName,
  setExName,
}) {
  return (
    <>
      <div className="mt-8">
        <Label
          label={'Exercise'}
          htmlFor="exName"
          value={exName}
          onChange={({ target }) => setExName(target.value)}
        />
        <select
          className="mx-auto w-full roounded-md"
          name="exName"
          id="exName"
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
              value={sets}
              placeholder="sets"
              id={'sets'}
              onChange={({ target }) => setSets(target.value)}
            />
          </div>

          <div>
            <Label label={'rep range'} htmlFor="repRange" />
            <Input
              type={'text'}
              name="repRange"
              value={repRange}
              placeholder="Rep range"
              id={'repRange'}
              onChange={({ target }) => setRepRange(target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectForm;
