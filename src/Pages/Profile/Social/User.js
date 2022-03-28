import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../../Layouts/Footer/Footer';
import { db } from '../../../Libs/Firebase';

import UserHeader from './UserHeader';

function User() {
  let { uid } = useParams();

  const [userProfile, setUserProfile] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    db.collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        setUserProfile(doc.data());
      });

    setIsLoaded(true);
  }, []);

  return (
    <>
      <div>User</div>

      {isLoaded && <UserHeader u={userProfile} uid={uid} />}

      <Footer />
    </>
  );
}

export default User;
