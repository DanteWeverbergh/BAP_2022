import React, { useEffect, useState } from 'react';
import Footer from '../../Layouts/Footer/Footer';
import { IoIosArrowBack } from 'react-icons/io';
import { useAuthContext } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../Libs/Firebase';

import { MdOutlineEdit } from 'react-icons/md';
import ProfileHeader from './ProfileHeader';
import Records from './Records';
import MyPosts from './MyPosts';

function Profile() {
  const { user, logout } = useAuthContext();

  const [fullName, setFullName] = useState('');
  const [photoUrl, setPhotoUrl] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  );
  const [u, setU] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //

    if (user) {
      //
      setPhotoUrl(user.photoURL);

      db.collection('users')
        .doc(user.uid)
        .get()
        .then((doc) => setU(doc.data()))
        .then(() => {
          setIsLoaded(true);
        });
    }
  }, []);

  return (
    <>
      {isLoaded ? <ProfileHeader photoUrl={photoUrl} u={u} /> : <div></div>}

      {/*1RM*/}

      <Records u={u} />

      <MyPosts />

      <Footer />
    </>
  );
}

export default Profile;
