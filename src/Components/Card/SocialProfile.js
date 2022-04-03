import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';

function SocialProfile({ post, postUser }) {
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

  return (
    <>
      <div className="flex justify-between">
        <div className="flex">
          <Link to={`/profile/${postUser.uid}`}>
            <img
              alt="profilePic"
              className="h-12 w-12 rounded-full object-cover mr-4"
              //src="https://picsum.photos/200"
              src={post.uPhoto}
            />
          </Link>
          <div>
            <h1>{postUser.fullName}</h1>
            <p>{isLoaded && date}</p>
          </div>
        </div>

        <div>...</div>
      </div>
    </>
  );
}

export default SocialProfile;
