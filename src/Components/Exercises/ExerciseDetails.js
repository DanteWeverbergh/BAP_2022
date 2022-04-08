import React, { useEffect, useState } from 'react';
import { MdOndemandVideo } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Libs/Firebase';
import ExerciseSingle from './ExerciseSingle';

function ExerciseDetails({ exercise, setVideoModal, setYtId }) {
  let navigate = useNavigate();

  const [videoUrl, setVideoUrl] = useState('');
  const [docId, setDocId] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);

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
      <div className="text-white-950 flex flex-col space-y-4">
        {exercise.Exercises &&
          exercise.Exercises.map((exercise) => (
            <ExerciseSingle
              exercise={exercise}
              setVideoModal={setVideoModal}
              setYtId={setYtId}
            />
          ))}
      </div>
    </>
  );
}

export default ExerciseDetails;
