import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useAuthContext } from '../../../Context/AuthContext';
import { db } from '../../../Libs/Firebase';
import { follow } from '../../../Libs/Firestore';

function Followers({
  followersList,
  setFollowersList,
  list,
  following,
  followers,
}) {
  const { user } = useAuthContext();
  const [listOfUsers, setListOfUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let unmounted = false;
    //
    if (list === 'followers') {
      db.collection('users')
        .where('uid', 'in', followers)
        .onSnapshot((snapshot) => {
          if (!unmounted) {
            setListOfUsers(snapshot.docs.map((doc) => doc.data().displayName));
          }
        });
    } else {
      db.collection('users')
        .where('uid', 'in', following)
        .onSnapshot((snapshot) => {
          if (!unmounted) {
            setListOfUsers(snapshot.docs.map((doc) => doc.data().displayName));
          }
        });
    }

    setIsLoaded(true);

    console.log(listOfUsers);

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <>
      <div className="bg-slate-950 z-50 h-screen w-screen transparant-10 relative text-white-950 flex flex-col justify-center">
        <div className="">
          <IoCloseOutline
            onClick={() => setFollowersList(false)}
            className="text-3xl absolute top-12 right-12 text-white-950"
          />
        </div>
        <div className="flex items-center justify-center flex-col">
          <div>
            <h1 className="font-semibold text-2xl">{list}</h1>
          </div>
          <ul>
            {isLoaded &&
              listOfUsers.map((displayName) => {
                <li>{displayName}</li>;
              })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Followers;
