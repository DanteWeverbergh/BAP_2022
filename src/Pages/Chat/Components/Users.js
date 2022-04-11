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
    setActiveUser(user);
    console.log(listOfUsers);
  }, []);

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

        <div className="mx-12 mt-16">
          {listOfUsers
            .filter(({ id, user }) => {
              if (search === '') {
                return user;
              } else if (
                user.username.toLowerCase().includes(search.toLowerCase())
              ) {
                console.log('user:', user.username);
                return user;
              }
            })
            .map(({ id }) =>
              id !== activeUser.uid ? <ListProfile uid={id} /> : <div></div>
            )}
        </div>
      </div>
    </>
  );
}

export default Users;
