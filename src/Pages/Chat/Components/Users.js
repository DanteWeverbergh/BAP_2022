import userEvent from '@testing-library/user-event';
import React, { useEffect } from 'react';
import { useAuthContext } from '../../../Context/AuthContext';
import { db, FieldValue } from '../../../Libs/Firebase';
import ChatProfile from './ChatProfile';

function Users({ setShowList, listOfUsers }) {
  const { user } = useAuthContext();

  useEffect(() => {
    console.log(listOfUsers);
  }, []);

  const add = (uid) => {
    console.log('add', uid);

    db.collection('users')
      .doc(user.uid)
      .update('chat', FieldValue.arrayUnion(uid))
      .then(() => {
        console.log('added to contacts');
      });
  };

  return (
    <>
      <div className="z-50 bg-slate-800 h-screen absolute top-0 w-full">
        <div>List of users</div>

        <div className="mx-12">
          {listOfUsers.map(({ id, user }) => (
            <div className="bg-slate-700  w-full py-2 mt-4 rounded-md relative">
              <p>{user.username}</p>
              <button
                className="absolute right-4 bg-blue-500"
                onClick={() => add(id)}
              >
                Add
              </button>
            </div>
          ))}
        </div>

        <div onClick={() => setShowList(false)}>X</div>
      </div>
    </>
  );
}

export default Users;
