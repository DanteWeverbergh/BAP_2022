import React from 'react';

function SelectForm({ isLoaded, exercisesDB }) {
  return (
    <>
      <div className="mt-6">
        <select className="mx-auto w-full roounded-md">
          {isLoaded &&
            exercisesDB.map((e) => <option value={e.name}> {e.name}</option>)}
        </select>
      </div>
    </>
  );
}

export default SelectForm;
