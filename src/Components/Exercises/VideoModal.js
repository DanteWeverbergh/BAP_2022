import React, { useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

function VideoModal({ setVideoModal, ytId }) {
  useEffect(() => {
    console.log(ytId);
  }, []);

  return (
    <>
      {ytId && ytId}
      <div className="bg-slate-950 z-50 h-screen w-screen transparant-10 relative flex flex-col justify-center">
        <div className="">
          <IoCloseOutline
            className="text-3xl absolute top-12 right-12 text-white-950"
            onClick={() => setVideoModal(false)}
          />
        </div>
        <h1 className="text-white-950 mx-12 mb-6 -mt-28">videomodal</h1>
      </div>
    </>
  );
}

export default VideoModal;
