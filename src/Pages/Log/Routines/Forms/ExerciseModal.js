import React, { useEffect, useState } from 'react';
import Button from '../../../../Components/Button';
import Input from '../../../../Components/Input';
import Label from '../../../../Components/Label';
import { addDoc } from '../../../../Libs/Firestore';

function ExerciseModal() {
  const [exerciseName, setExersiceName] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: exerciseName,
      videoUrl: videoUrl,
    };

    addDoc('exercises', data);
  };

  return (
    <>
      {videoUrl}
      <div className="bg-red-400 h-screen z-50 w-full">
        <form className="mx-12" onSubmit={handleSubmit}>
          <Label label={'exerciseName'} htmlFor="exerciseName" />
          <Input
            type={'text'}
            name="exerciseName"
            value={exerciseName}
            placeholder="Exercise name"
            id={'exerciseName'}
            onChange={({ target }) => setExersiceName(target.value)}
          />

          <Label label={'videoUrl'} htmlFor="videoUrl" />
          <Input
            type={'text'}
            name="videoUrl"
            value={videoUrl}
            placeholder="video url"
            id={'videoUrl'}
            onChange={({ target }) => setVideoUrl(target.value)}
          />

          <Button text={'add exercise'} />
        </form>
      </div>
    </>
  );
}

export default ExerciseModal;
