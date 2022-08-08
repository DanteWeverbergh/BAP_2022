import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import Modal from './Modal';
import Swal from 'sweetalert2';

import { deleteDoc } from '../../Libs/Firestore';

function SocialProfile({ post, postUser, setModal, setPostId, postId }) {
  const { user } = useAuthContext();
  const [date, setDate] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const date = new Intl.DateTimeFormat('de-De', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(post.created.toDate());

    // console.log(post.created.toDate());
    setDate(date);

    setIsLoaded(true);
  }, []);

  const menu = () => {
    if (user.uid === postUser.uid) {
      setPostId(postId);
      setModal(true);
    }
  };

  const dots = () => {
    // delete post ?

    Swal.fire({
      title: 'Do you want to delete this post?',
      showCancelButton: true,
      denyButtonColor: 'green',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#DA3633',
      cancelButtonColor: '#2EA043',
      color: '#F0F6FC',
      background: '#0D1017',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteDoc('posts', postId);

        Swal.fire({
          icon: 'success',
          title: 'Post deleted',
          color: '#F0F6FC',
          background: '#0D1017',
          iconColor: '#2EA043',
          confirmButtonColor: '#206FEB',
        });
      }
    });
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex">
          <Link to={`/profile/${postUser.uid}`}>
            <img
              alt="profilePic"
              className="h-12 w-12 rounded-full object-cover mr-4 border-blue-950 border-2"
              //src="https://picsum.photos/200"
              src={post.uPhoto}
            />
          </Link>
          <div>
            <h1>{postUser.fullName}</h1>
            <p>{isLoaded && date}</p>
          </div>
        </div>

        {/**
        <div onClick={() => menu()}>...</div>
         */}
        <div onClick={() => dots()}>...</div>
      </div>
    </>
  );
}

export default SocialProfile;
