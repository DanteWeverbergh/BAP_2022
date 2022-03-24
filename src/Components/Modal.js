import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import './Modal.css';

function Modal({ setOpenModal, routine, selectRoutine }) {
  return (
    <>
      <div className="bg-slate-800 h-screen transparant-10 relative flex flex-col justify-center">
        <div className="">
          <IoCloseOutline
            onClick={() => setOpenModal(false)}
            className="text-2xl absolute top-12 right-12 text-white"
          />
        </div>
        <h1 className="text-white mx-12 mb-6 -mt-28">
          Are You sure you want to add {routine.name} as your current routine?
        </h1>

        <div className="flex content-start justify-between mx-12">
          <button
            className="bg-red-400 px-12 py-4"
            onClick={() => setOpenModal(false)}
          >
            No
          </button>
          <button
            className="bg-green-400 px-12 py-4"
            onClick={() => selectRoutine()}
          >
            Yes
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
