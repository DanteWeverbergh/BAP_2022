import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import './Modal.css';

function Modal({ openModal, setOpenModal }) {
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button>
              <IoCloseOutline
                onClick={() => setOpenModal(false)}
                className="text-white text-2xl"
              />
            </button>
          </div>
          <div className="title">
            <h1>Titel</h1>
          </div>
          <div className="body">
            <p>jkjkdskkdhksdjmlshhm</p>
          </div>
          <div className="footer">footer</div>
        </div>
      </div>
    </>
  );
}

export default Modal;
