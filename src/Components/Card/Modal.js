import React, { useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { deleteDoc } from '../../Libs/Firestore';

function Modal({ setModal, modal, postId, setIsDeleted }) {
  useEffect(() => {
    if (modal) {
      window.scrollTo({
        top: 0,
      });
    }
  }, []);

  const yes = () => {
    //
    deleteDoc('posts', postId, setIsDeleted, setModal);
  };

  return (
    <>
      <div className="bg-slate-950 z-50 h-screen w-screen transparant-10 relative flex flex-col justify-center">
        <div className="">
          <IoCloseOutline
            onClick={() => setModal(false)}
            className="text-3xl absolute top-12 right-12 text-white-950"
          />
        </div>
        <h1 className="text-white-950 mx-12 mb-6 -mt-28">
          Are you sure you want to delete this post?
        </h1>

        <div className="flex content-start justify-between mx-12">
          <button
            className="bg-red-950 px-12 py-4"
            onClick={() => setModal(false)}
          >
            No
          </button>
          <button className="bg-green-950 px-12 py-4" onClick={() => yes()}>
            Yes
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
