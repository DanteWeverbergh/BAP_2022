import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';

function Back() {
  return (
    <Link to={'/log'}>
      <div className="m-5 h-12 w-12 bg-slate-400 flex justify-center  items-center rounded-full">
        <IoArrowBack className="text-white text-2xl" />
      </div>
    </Link>
  );
}

export default Back;
