import React, { useContext, useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosFitness } from 'react-icons/io';
import { MdOutlineEdit } from 'react-icons/md';

import { Link, useParams } from 'react-router-dom';
import Back from '../../../Components/Back';
import { useAuthContext } from '../../../Context/AuthContext';
import FirebaseContext from '../../../Context/Firebase';
import { db } from '../../../Libs/Firebase';
import { follow } from '../../../Libs/Firestore';

function UserHeader({ u }) {
  const { user, logout } = useAuthContext();

  let { uid } = useParams();

  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [workoutPoints, setWorkoutPoints] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //

    console.log(u.followers);
    console.log(user.uid);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center ">
        <Back />
        {/* <button
          className="px-4 py-2 bg-blue-950 text-white-950 m-5 rounded-lg"
          onClick={() => follow(user.uid, uid, isFollowing, setIsFollowing)}
        >
          {isFollowing ? 'unfollow' : 'follow'}
        </button> */}
      </div>

      <div className="flex-col text-center grid place-items-center">
        <div className=" relative w-36 h-36 grid place-items-center  bg-blue-500 rounded-full  ">
          {u.photoURL && (
            <img
              className="h-32 w-32 rounded-full object-cover"
              alt="profilePic"
              src={`${u.photoURL.replace(
                'https://firebasestorage.googleapis.com/v0/b/gains-dd329.appspot.com',
                'https://ik.imagekit.io/w2g1ssyqs/'
              )}&tr=w-500`}
            />
          )}

          <div className="bg-slate-960 h-12 w-12  absolute top-0 right-0 border-2 border-blue-950 rounded-full flex items-center flex-col justify-center text-white-950">
            <p>{workoutPoints}</p>
            <IoIosFitness />
          </div>
        </div>
        <div className="text-2xl mt-4 mb-8 text-white-950">{u.fullName}</div>
        {/* <div className="w-full">
          <div className="text-white-950  mb-4 mx-24 flex justify-between">
            <div onClick={() => console.log('following')}>
              <div>{u.following ? u.following.length : '0'} </div>following
            </div>
            <div onClick={() => console.log('followers')}>
              <div>{u.followers ? u.followers.length : '0'} </div>followers
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default UserHeader;
