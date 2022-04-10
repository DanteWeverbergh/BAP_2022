import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../Context/AuthContext';
import { db } from '../../../Libs/Firebase';

function ChatProfile({ data, id }) {
  const { user } = useAuthContext();
  const [isOnline, setIsOnline] = useState(true);
  const [cardUser, setCardUser] = useState({});
  const [uid, setUid] = useState('');
  const [date, setDate] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //

    const month = new Intl.DateTimeFormat('de-De', {
      month: 'short',
    }).format(data.lastUpdated.toDate());

    const day = new Intl.DateTimeFormat('de-De', {
      day: '2-digit',
    }).format(data.lastUpdated.toDate());

    const time = new Intl.DateTimeFormat('de-De', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(data.lastUpdated.toDate());

    setDate(`${day} ${month} - ${time}`);

    data.users.map((uid) => {
      if (uid !== user.uid) {
        setUid(uid);
      }
    });
  }, []);

  useEffect(() => {
    let unsubscribe;

    if (uid) {
      unsubscribe = db
        .collection('users')
        .doc(uid)
        .onSnapshot((doc) => setCardUser(doc.data()));

      setIsLoaded(true);

      return unsubscribe;
    }
  }, [uid]);

  return (
    <>
      <Link
        to={`/chat/${uid}`}
        className="bg-slate-960 w-full py-2 rounded-md mt-4 text-white-950 flex relative"
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
          <p>{data.lastMessage}</p>
        </div>

        <p className="absolute right-12 top-0">{date}</p>

        {cardUser.online ? (
          <div className="absolute right-4 top-0-4 bg-green-950 h-2 w-2 rounded-full"></div>
        ) : (
          <div className="absolute right-4 top-0-4 bg-red-950 h-2 w-2 rounded-full"></div>
        )}
      </Link>
    </>
  );
}

export default ChatProfile;
