import React from 'react';
import Input from '../../../../Components/Input';
import Label from '../../../../Components/Label';

function ExerciseModal({ exersiceName, setExersiceName }) {
  return (
    <>
      <div className="bg-red-400 h-screen z-50 w-full">
        <form className="mx-12">
          <Label label={'name'} htmlFor="name" />
          <Input
            type={'text'}
            name="exersiceName"
            value={exersiceName}
            placeholder="Exercise name"
            id={'exersiceName'}
            onChange={({ target }) => setExersiceName(target.value)}
          />
        </form>
      </div>
    </>
  );
}

export default ExerciseModal;
