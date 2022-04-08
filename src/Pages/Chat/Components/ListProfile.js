import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../Context/AuthContext';
import { db } from '../../../Libs/Firebase';
import { addContact } from '../../../Libs/Firestore';

function ListProfile({ uid }) {
  const [isOnline, setIsOnline] = useState(true);
  const [cardUser, setCardUser] = useState({});

  const [isLoaded, setIsLoaded] = useState(false);

  const { user } = useAuthContext();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    //

    let unmount = false;

    db.collection('users')
      .doc(uid)
      .onSnapshot((doc) => {
        if (!unmount) {
          setCardUser(doc.data());
        }
      });

    db.collection('users')
      .doc(user.uid)
      .onSnapshot((snapshot) => {
        if (!unmount) {
          const chat = snapshot.data().chat;

          setContacts(chat.map((id) => id));
        }
      });

    setIsLoaded(true);

    return () => {
      unmount = true;
    };
  }, []);

  return (
    <>
      {isLoaded && !contacts.includes(uid) ? (
        <div
          to={`/chat/${uid}`}
          className="bg-slate-960 w-full py-2 rounded-md mt-4 flex relative items-center text-white-950"
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
          </div>

          <div>
            {cardUser.online ? (
              <div className="absolute right-4 top-4 bg-green-950 h-2 w-2 rounded-full"></div>
            ) : (
              <div className="absolute right-4 top-4 bg-red-950 h-2 w-2 rounded-full"></div>
            )}
            <button
              onClick={() => addContact(user, uid, setIsLoaded)}
              className="absolute right-4 bottom-0 text-xl"
            >
              +
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default ListProfile;
