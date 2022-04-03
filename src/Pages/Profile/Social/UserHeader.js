import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';

import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../Context/AuthContext';
import FirebaseContext from '../../../Context/Firebase';
import { db, FieldValue } from '../../../Libs/Firebase';
import { follow } from '../../../Libs/Firestore';

function UserHeader({ photoUrl, u, uid }) {
  const { user } = useAuthContext();

  const { firebase } = useContext(FirebaseContext);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //ToDo verder uitwerken

    db.collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        const followers = doc.data().followers;

        followers.map((f) => {
          if (user.uid === f) {
            setIsFollowing(true);
          }
        });
      });

    setIsLoaded(true);
  }, []);

  return (
    <>
      <div className="flex justify-between mx-6 mt-6">
        <Link
          className="rounded-full bg-slate-700 h-8 w-8 text-center "
          to={'/home'}
        >
          <IoIosArrowBack className="text-3xl text-center text-white" />
        </Link>

        {isFollowing ? (
          <div
            className="px-4 bg-blue-500 rounded-md text-white"
            onClick={() => follow(user.uid, uid, false, setIsFollowing)}
          >
            Unfollow
          </div>
        ) : (
          <div
            className="px-4 bg-blue-500 rounded-md text-white"
            onClick={() => follow(user.uid, uid, true, setIsFollowing)}
          >
            follow
          </div>
        )}
      </div>

      <div className="flex-col text-center grid place-items-center">
        <div className=" relative w-36 h-36 grid place-items-center  bg-blue-500 rounded-full  mr-5 mt-5  ">
          {u.photoURL && (
            <img
              className="h-32 w-32 rounded-full object-cover"
              alt="profilePic"
              src={u.photoURL}
            />
          )}
        </div>
        <div className="text-2xl mt-4 mb-8 text-white">{u.fullName}</div>
      </div>

      <div className="text-white  mb-4 bg-slate-700 px-4 py-2 flex jusify-between w-full">
        <div> following</div>
        <div> followers</div>
        <div> ... posts</div>
      </div>
    </>
  );
}

export default UserHeader;
