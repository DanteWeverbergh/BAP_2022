import React, { useEffect } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';
import { useAuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';

function ProfileHeader({ photoUrl, u }) {
  const { user, logout } = useAuthContext();

  useEffect(() => {
    console.log(u);
  });

  return (
    <>
      <div className="flex justify-between mx-6 mt-6">
        <Link
          className="rounded-full bg-slate-700 h-8 w-8 text-center "
          to={'/home'}
        >
          <IoIosArrowBack className="text-3xl text-center text-white" />
        </Link>

        <button className="px-4 bg-blue-500 rounded-md" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="flex-col text-center grid place-items-center">
        <div className=" relative w-36 h-36 grid place-items-center  bg-blue-500 rounded-full  mr-5 mt-5  ">
          <img
            className="h-32 w-32 rounded-full object-cover"
            alt="profilePic"
            src={photoUrl}
          />

          <Link
            className="h-6 w-6  rounded-full absolute bottom-3 right-3 bg-blue-500 text-center"
            to={'/profile/edit'}
          >
            <MdOutlineEdit className="text-white text-center text-xl" />
          </Link>
        </div>
        <div className="text-2xl mt-4 mb-8 text-white">
          Welcome {u.fullName}
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
