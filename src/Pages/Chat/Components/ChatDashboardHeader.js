import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../../Context/AuthContext';
import { TbMessagePlus } from 'react-icons/tb';
import Swal from 'sweetalert2';

function ChatDashboardHeader() {
  const { user } = useAuthContext();
  const location = useLocation();
  const [photoUrl, setPhotoUrl] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  );

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoUrl(user.photoURL);
    }
  }, []);

  //   const newContact = () => {
  //     console.log('new contact');
  //     Swal.fire({
  //       title: 'Add new contact',
  //       confirmButtonText: 'Add',
  //       confirmButtonColor: '#206FEB',
  //       cancelButtonColor: '#DA3633',
  //       showCancelButton: true,
  //       color: '#F0F6FC',
  //       background: '#0D1017',

  //       //input
  //       input: 'text',
  //     }).then((result) => {
  //       console.log(result);
  //     });
  //

  return (
    <>
      <header className="mb-24 ">
        <Link to={'/'}>
          <h1 className="text-blue-950 text-3xl absolute top-0 left-0 ml-5 mt-5">
            Gains
          </h1>
        </Link>

        <div>
          <div className="text-white-950  bg-blue-950 rounded-full  flex justify-center items-center  text-3xl w-14 h-14 absolute top-0 right-24 mt-5 ">
            <TbMessagePlus />
          </div>
          <Link
            to={'/profile'}
            className="w-14 h-14 grid place-items-center  bg-blue-950 rounded-full absolute top-0 right-0 mr-5 mt-5  "
          >
            <img
              className="rounded-full h-12 w-12 object-cover"
              alt="p"
              src={`${photoUrl.replace(
                'https://firebasestorage.googleapis.com/v0/b/gains-dd329.appspot.com',
                'https://ik.imagekit.io/w2g1ssyqs/'
              )}&tr=w-150`}
            />
          </Link>
        </div>
      </header>
    </>
  );
}

export default ChatDashboardHeader;
