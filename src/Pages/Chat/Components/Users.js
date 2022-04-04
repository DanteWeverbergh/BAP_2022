import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../Context/AuthContext';
import { db, FieldValue } from '../../../Libs/Firebase';
import { addContact } from '../../../Libs/Firestore';
import ChatProfile from './ChatProfile';

function Users({ setShowList, listOfUsers }) {
  const { user } = useAuthContext();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log(listOfUsers);
  }, []);

  const add = (uid) => {
    addContact(user, uid, setIsLoaded);
  };

  return (
    <>
      <div className="z-50 bg-slate-800 h-screen absolute top-0 w-full">
        <div
          className="m-5 h-12 w-12 bg-slate-400 flex justify-center  items-center rounded-full absolute top-0 right-0"
          onClick={() => setShowList(false)}
        >
          X
        </div>

        <div>List of users</div>

        <div className="mx-12 mt-16">
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
      </div>
    </>
  );
}

export default Users;
