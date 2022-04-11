import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { IoIosArrowBack, IoIosFitness } from 'react-icons/io';

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
  const [workoutPoints, setWorkoutPoints] = useState('');

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

    db.collection('workouts')
      .doc(uid)
      .collection('workouts')
      .onSnapshot((snapshot) => {
        setWorkoutPoints(snapshot.size);
      });

    setIsLoaded(true);
  }, [isLoaded]);

  return (
    <>
      <div className="flex justify-between mx-6 mt-6">
        <Link
          className="rounded-full bg-white-950  h-8 w-8 text-center "
          to={'/home'}
        >
          <IoIosArrowBack className="text-3xl text-center text-slate-950" />
        </Link>

        {isFollowing ? (
          <div
            className="px-4 bg-blue-950  rounded-md text-white"
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
        <div className=" relative w-36 h-36 grid place-items-center  bg-blue-950 rounded-full  mr-5 mt-5  ">
          {u.photoURL && (
            <img
              className="h-32 w-32 rounded-full object-cover"
              alt="profilePic"
              src={u.photoURL}
            />
          )}

          <div className="bg-slate-960 h-12 w-12  absolute top-0 right-0 border-2 border-blue-950 rounded-full flex items-center flex-col justify-center text-white-950">
            <p>{workoutPoints}</p>
            <IoIosFitness />
          </div>
        </div>
        <div className="text-2xl mt-4 mb-8 text-white-950">{u.fullName}</div>
      </div>

      <div className="w-full">
        <div className="text-white-950  mb-4 bg-slate-960 px-4 py-2 flex justify-between">
          <div>following</div>
          <div>followers</div>
          <div> posts</div>
        </div>
      </div>
    </>
  );
}

export default UserHeader;
