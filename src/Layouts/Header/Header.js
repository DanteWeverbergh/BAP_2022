import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';

function Header() {
  const [photoUrl, setPhotoUrl] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  );

  const { user } = useAuthContext();

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoUrl(user.photoURL);
    }
  }, [user]);

  return (
    <>
      <header className="mb-16 ">
        <Link to={'/'}>
          <h1 className="text-3xl text-red-500 absolute top-0 left-0 ml-5 mt-5">
            Gains
          </h1>
        </Link>

        <Link
          to={'/profile'}
          className="w-14 h-14 grid place-items-center  bg-red-500 rounded-full absolute top-0 right-0 mr-5 mt-5  justfy"
        >
          <img
            className="rounded-full h-12 w-12 object-cover"
            alt="profilePicture"
            src={photoUrl}
          />
        </Link>
      </header>
    </>
  );
}

export default Header;
