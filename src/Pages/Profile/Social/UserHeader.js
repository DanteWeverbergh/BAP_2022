import React, { useEffect } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';

import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../Context/AuthContext';

function UserHeader({ photoUrl, u, uid }) {
  const { user } = useAuthContext();

  const follow = () => {
    //
    console.log('ikke: ', user.uid);
    console.log('profiel: ', uid);
  };

  return (
    <>
      <div className="flex justify-between mx-6 mt-6">
        <Link
          className="rounded-full bg-slate-700 h-8 w-8 text-center "
          to={'/home'}
        >
          <IoIosArrowBack className="text-3xl text-center text-white" />
        </Link>

        <div
          className="px-4 bg-blue-500 rounded-md text-white"
          onClick={() => follow()}
        >
          Follow
        </div>
      </div>

      <div className="flex-col text-center grid place-items-center">
        <div className=" relative w-36 h-36 grid place-items-center  bg-blue-500 rounded-full  mr-5 mt-5  ">
          {photoUrl && (
            <img
              className="h-32 w-32 rounded-full object-cover"
              alt="profilePic"
              src={photoUrl}
            />
          )}
        </div>
        <div className="text-2xl mt-4 mb-8 text-white">{u.fullName}</div>
      </div>
    </>
  );
}

export default UserHeader;
