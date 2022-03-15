import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';

function SocialProfile({ post, postUser }) {
  const { user } = useAuthContext();

  return (
    <>
      <div className="flex justify-between">
        <div className="flex">
          <Link to={`/profile/${postUser.uid}`}>
            <img
              alt="profilePic"
              className="h-12 w-12 rounded-full object-cover mr-4"
              //src="https://picsum.photos/200"
              src={user.photoURL}
            />
          </Link>
          <div>
            <h1>{postUser.fullName}</h1>
            <p>{post.timeStamp}</p>
          </div>
        </div>

        <div>...</div>
      </div>
    </>
  );
}

export default SocialProfile;
