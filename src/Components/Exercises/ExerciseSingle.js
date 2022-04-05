import React, { useEffect, useState } from 'react';
import { MdOndemandVideo } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { db } from '../../Libs/Firebase';
import YouTube from 'react-youtube';

function ExerciseSingle({ exercise }) {
  const [videoUrl, setVideoUrl] = useState('');
  const [ytId, setYtId] = useState('');

  useEffect(() => {
    //

    db.collection('exercises')
      .where('name', '==', exercise.exName)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setVideoUrl(doc.data().videoUrl);
        });
      });

    //Youtube url to youtube id

    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = videoUrl.match(regExp);

    setYtId(match && match[7].length == 11 ? match[7] : false);
  }, []);

  return (
    <>
      <div className="border-b-2 flex justify-between mt-2">
        <p>{exercise.exName}</p>

        <Link to={'www.google.com'}>
          <MdOndemandVideo />
        </Link>

        <YouTube videoId={ytId} />

        <div className="flex">
          <p>sets: {exercise.sets}</p>
          <p className="ml-4">reps: {exercise.repRange}</p>
        </div>
      </div>
    </>
  );
}

export default ExerciseSingle;
