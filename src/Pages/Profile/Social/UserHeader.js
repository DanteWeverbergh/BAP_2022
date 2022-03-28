import React, { useContext, useEffect } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';

import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../Context/AuthContext';
import FirebaseContext from '../../../Context/Firebase';
import { db, FieldValue } from '../../../Libs/Firebase';

function UserHeader({ photoUrl, u, uid }) {
  const { user } = useAuthContext();

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    //
  }, []);

  const follow = () => {
    //
    console.log('ikke: ', user.uid);
    console.log('profiel: ', uid);

    //update current user following

    db.collection('users')
      .doc(user.uid)
      .update('following', FieldValue.arrayUnion(uid));

    // update user followers
    db.collection('users')
      .doc(uid)
      .update('followers', FieldValue.arrayUnion(user.uid));
  };

  const unFollow = () => {
    //
    console.log('ikke: ', user.uid);
    console.log('profiel: ', uid);

    //update current user following

    db.collection('users')
      .doc(user.uid)
      .update('following', FieldValue.arrayRemove(uid));

    // update user followers
    db.collection('users')
      .doc(uid)
      .update('followers', FieldValue.arrayRemove(user.uid));
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
