import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../../Context/AuthContext';
import Footer from '../../../Layouts/Footer/Footer';
import { db } from '../../../Libs/Firebase';
import { deadliftGifs, squatGifs } from '../../../Libs/Gifs';

import UserHeader from './UserHeader';
import UserPosts from './UserPosts';
import UserRecords from './UserRecords';

function User() {
  let { uid } = useParams();
  const { user } = useAuthContext();

  let navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let unmounted = false;
    if (user.uid === uid) {
      //
      return navigate('/profile');
    }

    db.collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        console.log(doc.data());
        if (!unmounted) {
          setUserProfile(doc.data());
        }
      });

    setIsLoaded(true);

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <>
      {isLoaded && <UserHeader u={userProfile} />}

      {isLoaded && <UserRecords u={userProfile} />}
      {/* {isLoaded && <UserHeader u={userProfile} uid={uid} />}



      <UserRecords uid={uid} />
      <UserPosts />

      <Footer /> */}
    </>
  );
}

export default User;
