import React, { useEffect, useState } from 'react';
import { MdOndemandVideo } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { db } from '../../Libs/Firebase';
import YouTube from 'react-youtube';
import VideoModal from './VideoModal';

function ExerciseSingle({ exercise, setVideoModal, setYtId }) {
  const [ytUrl, setYtUrl] = useState('');

  useEffect(() => {
    //

    db.collection('exercises')
      .where('name', '==', exercise.exName)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setYtUrl(doc.data().videoUrl);
        });
      });
  }, []);

  const urlToId = () => {
    //

    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

    var match = ytUrl.match(regExp);

    setYtId(match && match[7].length == 11 ? match[7] : false);
  };

  const modal = () => {
    urlToId();
    setVideoModal(true);
  };

  return (
    <>
      <div className="bg-slate-960 px-4 py-2 rounded-md">
        <div className=" flex items-center justify-between">
          <div>
            <p className="font-semibold ">{exercise.exName}</p>

            <div className="flex">
              <p>sets: {exercise.sets}</p>
              <p className="ml-4">reps: {exercise.repRange}</p>
            </div>
          </div>
          <div>
            <MdOndemandVideo className="text-2xl" onClick={() => modal()} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ExerciseSingle;
