import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../Context/AuthContext';
import { db } from '../../../Libs/Firebase';

function OnlineUsers() {
  const { user } = useAuthContext();

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    //

    setCurrentUser(user);

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

    console.log(onlineUsers);

    setisLoaded(true);
  }, []);

  return (
    <>
      <div className="mx-12 flex w-full overflow-x-auto space-x-1 mt-4">
        {isLoaded &&
          onlineUsers.map(
            ({ id, user }) =>
              user.uid !== currentUser.uid && (
                <div className="flex flex-col items-center">
                  <img
                    className="h-12 w-12 rounded-full ml-4 object-cover"
                    src={
                      user.photoURL
                        ? user.photoURL
                        : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                    }
                    alt="profile"
                  />
                  <div className="text-white-950"> {user.username}</div>
                </div>
              )
          )}
      </div>
    </>
  );
}

export default OnlineUsers;
