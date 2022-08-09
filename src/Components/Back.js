import React, { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';

function Back({ link }) {
  return (
    <Link to={link}>
      <div className="m-5 h-12 w-12 bg-blue-950  flex justify-center  items-center rounded-full">
        <IoArrowBack className="text-white-950 text-2xl" />
      </div>
    </Link>
  );
}

export default Back;
