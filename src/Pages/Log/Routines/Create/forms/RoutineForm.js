import { type } from '@testing-library/user-event/dist/type';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Input from '../../../../../Components/Input';
import Label from '../../../../../Components/Label';

function RoutineForm({
  form,
  setForm,
  routineName,
  setRoutineName,
  shortDescription,
  setShortDescription,
  days,
  setDays,
  setDayForm,
}) {
  //states

  const next = () => {
    if (days) {
      setForm(2);
      setDayForm(1);
    } else {
      Swal.fire({
        text: 'You need to fill in the days field.',
        color: '#F0F6FC',
        background: '#0D1017',
        confirmButtonColor: '#206FEB',
      });
    }
  };

  return (
    <>
      <div>
        <Label label={'routine name'} htmlFor="routineName" />
        <Input
          placeholder={'Routine name'}
          type="text"
          onChange={({ target }) => setRoutineName(target.value)}
          value={routineName}
          name="routineName"
        />

        <Label label={'short description'} htmlFor="shortDescription" />
        <Input
          placeholder={'short description'}
          type="text"
          onChange={({ target }) => setShortDescription(target.value)}
          value={shortDescription}
          name="shortDescription"
        />

        <Label label={'Days'} htmlFor="days" />
        <Input
          placeholder={'Days'}
          type="number"
          name={'days'}
          onChange={({ target }) => setDays(target.value)}
          value={days}
        />

        <div
          className="bg-blue-950 py-2 rounded-lg flex items-center justify-center mt-12"
          onClick={() => next()}
        >
          Next
        </div>
      </div>
    </>
  );
}

export default RoutineForm;
