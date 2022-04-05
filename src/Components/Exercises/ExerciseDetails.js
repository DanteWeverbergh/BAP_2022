import React, { useEffect, useState } from 'react';
import { MdOndemandVideo } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Libs/Firebase';
import ExerciseSingle from './ExerciseSingle';

function ExerciseDetails({ exercise }) {
  let navigate = useNavigate();

  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    //
  }, []);

  const video = (e) => {
    db.collection('exercises')
      .where('name', '==', e.exName)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          console.log(doc.data().videoUrl);
          setVideoUrl(doc.data().videoUrl);
          // navigate(doc.data().videoUrl);
        });
      });
  };

  return (
    <>
      <div className="text-white-950 ">
        {exercise.Exercises &&
          exercise.Exercises.map((exercise) => (
            <ExerciseSingle exercise={exercise} />
          ))}
      </div>
    </>
  );
}

export default ExerciseDetails;
