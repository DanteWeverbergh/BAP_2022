import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react';
import Input from '../../../Components/Input';
import { useAuthContext } from '../../../Context/AuthContext';
import { db, FieldValue } from '../../../Libs/Firebase';
import { addContact } from '../../../Libs/Firestore';
import ChatProfile from './ChatProfile';
import ChatSearch from './ChatSearch';
import ListProfile from './ListProfile';

function Users({ setShowList, listOfUsers }) {
  const { user } = useAuthContext();

  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState('');
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    console.log(listOfUsers);

    setActiveUser(user);
  }, []);

  const add = (uid) => {
    addContact(user, uid, setIsLoaded);
  };

  return (
    <>
      <div className="z-50 bg-slate-950 h-screen absolute top-0 w-full">
        <div
          className="m-5 h-12 w-12 bg-slate-400 flex justify-center  items-center rounded-full absolute top-0 right-0"
          onClick={() => setShowList(false)}
        >
          X
        </div>

        <div className="flex  justify-around mt-32">
          <form className="w-full mx-12">
            <Input
              type={'text'}
              placeholder={'search'}
              name="search"
              value={search}
              id="search"
              onChange={({ target }) => setSearch(target.value)}
            />
          </form>
        </div>

        {/** 

        <div className="mx-12 mt-16">
          {listOfUsers
            .filter(({ user }) => {
              if (search === '') {
                return user;
              } else if (
                user.username.toLowerCase().includes(search.toLocaleLowerCase())
              ) {
                return user;
              }
            })
            .map(({ id, user }) =>
              id !== activeUser.uid ? (
                <div className="bg-slate-960  w-full py-2 mt-4 rounded-md relative">
                  <p>{user.username}</p>
                  <button
                    className="absolute right-4 bg-blue-500"
                    onClick={() => add(id)}
                  >
                    Add
                  </button>
                </div>
              ) : (
                <div></div>
              )
            )}
        </div>
        */}

        <div className="mx-12 mt-16">
          {listOfUsers
            .filter(({ user }) => {
              console.log(user);

              if (search === '') {
                return user;
              } else if (
                user.username.toLowerCase().includes(search.toLowerCase())
              ) {
                return user;
              }
            })
            .map(({ id, user }) =>
              id !== activeUser.uid ? <ListProfile uid={id} /> : <div></div>
            )}
        </div>
      </div>
    </>
  );
}

export default Users;
