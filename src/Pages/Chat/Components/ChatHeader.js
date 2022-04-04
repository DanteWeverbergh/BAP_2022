import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Back from '../../../Components/Back';
import { useAuthContext } from '../../../Context/AuthContext';
import { db } from '../../../Libs/Firebase';

function ChatHeader() {
  let { uid } = useParams();
  const { user } = useAuthContext();

  const [chatUser, setChatUser] = useState({});

  useEffect(() => {
    //
    db.collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        setChatUser(doc.data());
      });
  }, []);

  return (
    <>
      <div className="flex h-16 bg-slate-960 items-center justify-between rounded-b-md text-white-950">
        <Back link={'/chat'} />
        <div className="mr-6 flex items-center">
          <div className="text-white text-2xl ml-4">
            <h1>{chatUser.username}</h1>
          </div>

          {chatUser.photoURL ? (
            <img
              className="h-12 w-12 rounded-full ml-4 object-cover"
              src={chatUser.photoURL}
              alt="profile"
            />
          ) : (
            <img
              className="h-12 w-12 rounded-full ml-4"
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              alt="profile"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ChatHeader;