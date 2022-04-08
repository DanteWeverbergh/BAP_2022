import React, { useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import YouTube from 'react-youtube';

function VideoModal({ setVideoModal, ytId }) {
  useEffect(() => {
    console.log(ytId);
  }, []);

  return (
    <>
      <div className="bg-slate-950 z-50 h-screen w-screen transparant-10 relative flex flex-col justify-center">
        <div className="">
          <IoCloseOutline
            className="text-3xl absolute top-12 right-12 text-white-950"
            onClick={() => setVideoModal(false)}
          />
        </div>

        {!ytId ? (
          <h1 className="text-center font-bold text-white-950 text-xl">
            Geen video gevonden
          </h1>
        ) : (
          <YouTube className="w-full h-48" videoId={ytId} />
        )}
      </div>
    </>
  );
}

export default VideoModal;
