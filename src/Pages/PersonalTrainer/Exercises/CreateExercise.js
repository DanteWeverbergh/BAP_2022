import React, { useState } from 'react';
import Input from '../../../Components/Input';
import Label from '../../../Components/Label';
import Footer from '../../../Layouts/Footer/Footer';
import Header from '../../../Layouts/Header/Header';

function CreateExercise() {
  const [name, setName] = useState('');
  const [videoUrl, setVideoUrl] = useState(null);
  const [muscles, setMuscles] = useState([]);

  return (
    <>
      <Header />

      <div className="text-xl text-white text-center mb-6">
        Add a new Exercise
      </div>

      <form className="mx-12">
        <div className="mt-12 mb-4">
          <Label label={'name'} htmlFor="name" />
          <Input
            type={'text'}
            name="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
            placeholder="Exercise name"
            id={'name'}
          />
        </div>
        <div className="mt-12 mb-4">
          <Label label={'video url'} htmlFor="videoUrl" />
          <Input
            type={'text'}
            name="videoUrl"
            value={videoUrl}
            onChange={({ target }) => setVideoUrl(target.value)}
            placeholder="video url"
            id={'video'}
          />
        </div>

        <div className="mt-12 mb-4">
          <Label label={'Select all muscles worked'} />
        </div>
      </form>

      <Footer />
    </>
  );
}

export default CreateExercise;
