import React, { useEffect, useState } from 'react';
import Input from '../../../Components/Input';
import { db } from '../../../Libs/Firebase';
import Users from './Users';

function ChatSearch({ search, setSearch }) {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    //

    let unsubsrcibe;

    unsubsrcibe = db.collection('users').onSnapshot((snapshot) => {
      setListOfUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          user: doc.data(),
        }))
      );
    });

    return unsubsrcibe;
  }, []);

  return (
    <>
      {showList && (
        <Users setShowList={setShowList} listOfUsers={listOfUsers} />
      )}

      <div className="flex mx-12 justify-around items-center">
        {/** 
        <form className="">
          <Input
            type={'text'}
            placeholder={'search'}
            name="search"
            value={search}
            id="search"
            onChange={({ target }) => setSearch(target.value)}
          />
        </form>
        */}
        <div
          onClick={() => setShowList(true)}
          className="text-3xl text-white bg-blue-950 text-white-950 w-full rounded-md flex items-center justify-center"
        >
          +
        </div>
      </div>
    </>
  );
}

export default ChatSearch;
