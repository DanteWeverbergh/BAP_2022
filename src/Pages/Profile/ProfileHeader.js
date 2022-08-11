import React, { useEffect, useState } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { IoIosFitness } from 'react-icons/io';
import { useAuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import { db } from '../../Libs/Firebase';
import Back from '../../Components/Back';

function ProfileHeader({ photoUrl, u }) {
  const { user, logout } = useAuthContext();
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [workoutPoints, setWorkoutPoints] = useState('');
  const [followersList, setFollowersList] = useState(false);
  const [posts, setPosts] = useState('');
  const [list, setList] = useState('');

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

    db.collection('posts')
      .where('uid', '==', user.uid)
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.length);
      });

    setIsLoaded(true);
  }, []);

  const openList = (list) => {
    setList(list);
    setFollowersList(true);
  };
  return (
    <>
      {/*
      
      followersList && list && (
        <Followers
          followersList={followersList}
          setFollowersList={setFollowersList}
          list={list}
          followers={followers}
          following={following}
        />
      )
    
    
      */}

      <div className="flex justify-between items-center ">
        <Back />

        <button
          className="px-4 py-2 bg-blue-950 text-white-950 m-5 rounded-lg"
          onClick={() => logout(user.uid)}
        >
          Logout
        </button>
      </div>

      <div className="flex-col text-center grid place-items-center">
        <div className=" relative w-36 h-36 grid place-items-center  bg-blue-500 rounded-full  ">
          {photoUrl && (
            <img
              className="h-32 w-32 rounded-full object-cover"
              alt="profilePic"
              src={`${photoUrl.replace(
                'https://firebasestorage.googleapis.com/v0/b/gains-dd329.appspot.com',
                'https://ik.imagekit.io/w2g1ssyqs/'
              )}&tr=w-500`}
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
        <div className="text-2xl mt-4 mb-8 text-white-950">{u.fullName}</div>
        <div className="w-full">
          <div className="text-white-950  mb-4 mx-24 flex justify-between">
            <div onClick={() => openList('following')}>
              <div>{following.length} </div>following
            </div>
            <div onClick={() => openList('followers')}>
              <div>{followers.length} </div>followers
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
