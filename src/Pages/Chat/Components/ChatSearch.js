import React, { useEffect, useState } from 'react';
import Input from '../../../Components/Input';
import { db } from '../../../Libs/Firebase';
import Users from './Users';

function ChatSearch() {
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

  const addChat = () => {
    console.log('caht');
  };
  return (
    <>
      {showList && (
        <Users setShowList={setShowList} listOfUsers={listOfUsers} />
      )}

      <div className="flex mx-12 justify-around">
        <form className="">
          <Input placeholder={'search'} />
        </form>
        <div
          onClick={() => setShowList(true)}
          className="text-3xl text-white bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center"
        >
          +
        </div>
      </div>
    </>
  );
}

export default ChatSearch;
