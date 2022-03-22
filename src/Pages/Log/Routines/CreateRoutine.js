import React, { useState } from 'react';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';
import Label from '../../../Components/Label';
import { useAuthContext } from '../../../Context/AuthContext';
import Footer from '../../../Layouts/Footer/Footer';
import Header from '../../../Layouts/Header/Header';
import { db } from '../../../Libs/Firebase';

function CreateRoutine() {
  const { user } = useAuthContext();

  //states
  const [days, setDays] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const data = {
        days,
        name,
        description,
        Trainer: user.uid,
      };

      db.collection('Routines')
        .add(data)
        .then(() => {
          alert('succes');
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="text-white">Create a new routine</div>

      <form className="mx-12" method="POST" onSubmit={handleSubmit}>
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

        <Button text={'create'} />
      </form>

      <Footer />
    </>
  );
}

export default CreateRoutine;
