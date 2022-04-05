import React, { useEffect, useState } from 'react';
import { db } from '../../../Libs/Firebase';

function OnlineUsers() {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    //

    db.collection('users')
      .where('online', '==', true)
      .onSnapshot((snaphot) => {
        setOnlineUsers(
          snaphot.docs.map((doc) => ({
            id: doc.id,
            user: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <>
      <div className="mx-12 flex w-full overflow-x-auto space-x-1 mt-4">
        <div className="">
          <img
            className="h-12 w-12 rounded-full ml-4"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            alt="profile"
          />
        </div>
        <div className="">
          <img
            className="h-12 w-12 rounded-full ml-4"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            alt="profile"
          />
        </div>
        <div className="">
          <img
            className="h-12 w-12 rounded-full ml-4"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            alt="profile"
          />
        </div>
      </div>
    </>
  );
}

export default OnlineUsers;
