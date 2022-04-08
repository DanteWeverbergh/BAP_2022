import React, { useState } from 'react';
import Button from '../../../../Components/Button';
import Input from '../../../../Components/Input';
import Label from '../../../../Components/Label';

function Form1({
  days,
  setDays,
  description,
  setDescription,
  name,
  setName,
  setPage,
}) {
  return (
    <>
      <div className="mt-6">
        <Label htmlFor={'name'} label="name" />
        <Input
          type={'text'}
          name="name"
          value={name}
          onChange={({ target }) => setName(target.value)}
          placeholder={'name'}
          id={'name'}
        />
      </div>

      <div className="mt-6">
        <Label htmlFor={'description'} label="description" />
        <Input
          type={'text'}
          name="description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          placeholder={'description'}
          id={'description'}
        />
      </div>

      <div className="mt-6">
        <Label htmlFor={'days'} label="days" />
        <Input
          type={'number'}
          name="days"
          value={days}
          onChange={({ target }) => setDays(target.value)}
          placeholder={'days'}
          id={'days'}
        />
      </div>

      <button
        className="bg-blue-950 py-2 px-4 rounded-md w-full text-white-950 mt-12"
        onClick={() => setPage(2)}
      >
        Next
      </button>
    </>
  );
}

export default Form1;
