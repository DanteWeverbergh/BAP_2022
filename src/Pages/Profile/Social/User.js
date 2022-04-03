import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../../Context/AuthContext';
import Footer from '../../../Layouts/Footer/Footer';
import { db } from '../../../Libs/Firebase';
import { deadliftGifs, squatGifs } from '../../../Libs/Gifs';

import UserHeader from './UserHeader';
import UserPosts from './UserPosts';

function User() {
  let { uid } = useParams();
  const { user } = useAuthContext();

  let navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (user.uid === uid) {
      //
      return navigate('/profile');
    }

    db.collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        setUserProfile(doc.data());
      });

    setIsLoaded(true);
  }, []);

  const test = () => {
    console.log('array', deadliftGifs);

    var gif = deadliftGifs[Math.floor(Math.random() * deadliftGifs.length)];

    console.log('enkele', gif);
  };

  return (
    <>
      {isLoaded && <UserHeader u={userProfile} uid={uid} />}

      <UserPosts />

      <button className="bg-green-400 p-5" onClick={() => test()}>
        Test
      </button>

      <Footer />
    </>
  );
}

export default User;
