import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../../Libs/Firebase';

function ChatProfile({ uid }) {
  const [isOnline, setIsOnline] = useState(true);
  const [cardUser, setCardUser] = useState({});

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //

    let unsubscribe;

    unsubscribe = db
      .collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        setCardUser(doc.data());
      });

    setIsLoaded(true);

    return unsubscribe;
  }, []);

  return (
    <>
      <Link
        to={`/chat/${uid}`}
        className="bg-slate-700 w-full py-2 rounded-md mt-4 flex relative"
      >
        {cardUser.photoURL ? (
          <img
            className="h-12 w-12 rounded-full ml-4 object-cover"
            src={cardUser.photoURL}
            alt="profile"
          />
        ) : (
          <img
            className="h-12 w-12 rounded-full ml-4"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            alt="profile"
          />
        )}

        <div className="ml-4">
          <h1>{cardUser.username}</h1>
          <p>Laatste bericht</p>
        </div>

        {cardUser.online ? (
          <div className="absolute right-4 top-0-4 bg-green-400 h-2 w-2 rounded-full"></div>
        ) : (
          <div className="absolute right-4 top-0-4 bg-red-400 h-2 w-2 rounded-full"></div>
        )}
      </Link>
    </>
  );
}

export default ChatProfile;
