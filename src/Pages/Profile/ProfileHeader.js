import React, { useEffect, useState } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { IoIosArrowBack, IoIosFitness } from 'react-icons/io';
import { useAuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import { db } from '../../Libs/Firebase';

function ProfileHeader({ photoUrl, u }) {
  const { user, logout } = useAuthContext();
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [workoutPoints, setWorkoutPoints] = useState('');

  useEffect(() => {
    setFollowing(u.following);
    u.followers && setFollowers(u.followers);

    db.collection('users').doc(user.uid).update({
      photoURL: photoUrl,
    });

    db.collection('workouts')
      .doc(user.uid)
      .collection('workouts')
      .onSnapshot((snapshot) => {
        setWorkoutPoints(snapshot.size);
      });

    setIsLoaded(true);
  });

  return (
    <>
      <div className="flex justify-between mx-6 mt-6">
        <Link
          className="rounded-full text-slate-950 bg-white-950 h-8 w-8 text-center "
          to={'/home'}
        >
          <IoIosArrowBack className="text-3xl text-center text-slate-950" />
        </Link>

        <button
          className="px-4 bg-blue-950 rounded-md"
          onClick={() => logout(user.uid)}
        >
          Logout
        </button>
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

          <div className="bg-slate-960 h-12 w-12  absolute top-0 right-0 border-2 border-blue-950 rounded-full flex items-center flex-col justify-center text-white-950">
            <p>{workoutPoints}</p>
            <IoIosFitness />
          </div>

          <Link
            className="h-6 w-6  rounded-full absolute bottom-3 right-3 bg-blue-950 text-center flex items-center justify-center"
            to={'/profile/edit'}
          >
            <MdOutlineEdit className="text-white-950 text-center text-xl" />
          </Link>
        </div>
        <div className="text-2xl mt-4 mb-8 text-white-950">
          Welcome {u.fullName}
        </div>

        <div className="text-white-950  mb-4 bg-slate-960 px-4 py-2 flex jusify-between w-full">
          <div>{following.length} following</div>
          <div> {followers.length} followers</div>
          <div> ... posts</div>
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
