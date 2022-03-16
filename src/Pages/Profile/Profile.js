import React, { useEffect, useState } from 'react';
import Footer from '../../Layouts/Footer/Footer';
import { IoIosArrowBack } from 'react-icons/io';
import { useAuthContext } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../Libs/Firebase';

import { MdOutlineEdit } from 'react-icons/md';

function Profile() {
  const { user, logout } = useAuthContext();

  const [fullName, setFullName] = useState('');
  const [photoUrl, setPhotoUrl] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  );
  const [u, setU] = useState({});

  useEffect(() => {
    //

    if (user) {
      //
      setPhotoUrl(user.photoURL);

      db.collection('users')
        .doc(user.uid)
        .get()
        .then((doc) => setU(doc.data()));
    }
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
        <div className="text-2xl mt-4 mb-8 text-white">Welcome {fullName}</div>
      </div>

      {/*1RM*/}
      <div className="flex justify-between mx-12">
        <div className="bg-blue-500 rounded-full h-24 w-24 flex ">
          <p className="m-auto">{u.deadlift1rm}</p>
        </div>
        <div className="bg-blue-500 rounded-full h-24 w-24 flex">
          <p className="m-auto">{u.squad1rm}</p>
        </div>
        <div className="bg-blue-500 rounded-full h-24 w-24 flex">
          <p className="m-auto">{u.bench1rm}</p>
        </div>
      </div>

      <div className="flex justify-between mx-12 ">
        <div className="bg-blue-500  h-12 w-24 flex ">
          <p className="m-auto">Deadlift</p>
        </div>
        <div className="bg-blue-500  h-12 w-24 flex">
          <p className="m-auto">Squad</p>
        </div>
        <div className="bg-blue-500  h-12 w-24 flex">
          <p className="m-auto">Bench</p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
