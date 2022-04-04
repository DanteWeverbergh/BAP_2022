import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';

function Header() {
  const [photoUrl, setPhotoUrl] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  );
  const [isHome, setIsHome] = useState(false);

  const { user } = useAuthContext();

  const location = useLocation();

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoUrl(user.photoURL);
    }

    const currentPath = location.pathname;

    if (
      currentPath === '/home' ||
      currentPath === 'Home' ||
      currentPath === '/'
    ) {
      setIsHome(true);
    }
  }, [user]);

  return (
    <>
      <header className="mb-24 ">
        <Link to={'/'}>
          <h1 className="text-blue-950 text-3xl absolute top-0 left-0 ml-5 mt-5">
            Gains
          </h1>
        </Link>

        <div>
          <div>
            {isHome ? (
              <Link
                className="bg-blue-950 rounded-full px-4 py-4 absolute top-0 right-24 mt-5"
                to={'/createpost'}
              >
                +
              </Link>
            ) : (
              <div></div>
            )}
          </div>
          <Link
            to={'/profile'}
            className="w-14 h-14 grid place-items-center  bg-blue-950 rounded-full absolute top-0 right-0 mr-5 mt-5  "
          >
            <img
              className="rounded-full h-12 w-12 object-cover"
              alt="p"
              src={photoUrl}
            />
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;
