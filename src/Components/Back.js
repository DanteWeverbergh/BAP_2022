import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function Back() {
  const navigate = useNavigate();
  return (
    <div
      className="m-5 h-12 w-12 bg-blue-950  flex justify-center  items-center rounded-full"
      onClick={() => navigate(-1)}
    >
      <IoArrowBack className="text-white-950 text-2xl" />
    </div>
  );
}

export default Back;
