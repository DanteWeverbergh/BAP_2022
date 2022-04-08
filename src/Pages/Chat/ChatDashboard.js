import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/AuthContext';
import Footer from '../../Layouts/Footer/Footer';
import Header from '../../Layouts/Header/Header';
import { db } from '../../Libs/Firebase';
import ChatProfile from './Components/ChatProfile';
import ChatSearch from './Components/ChatSearch';
import OnlineUsers from './Components/OnlineUsers';

function ChatDashboard() {
  const { user } = useAuthContext();

  const [onlineUsers, setOnlineUsers] = useState([]);

  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const [search, setSearch] = useState('');

  useEffect(() => {
    //

    let unsubscribe;

    unsubscribe = db
      .collection('users')
      .doc(user.uid)
      .onSnapshot((doc) => {
        setContacts(doc.data().chat);
      });

    setIsLoaded(true);

    return unsubscribe;
  }, []);

  useEffect(() => {
    //
  }, [contacts]);

  return (
    <>
      <div className="z-10">
        <Header />

        <ChatSearch search={search} setSearch={setSearch} />

        {/**
        <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory mt-4">
          <OnlineUsers />
        </div>
         */}

        <div className="flex flex-col items-center mx-12">
          {isLoaded &&
            contacts &&
            contacts
              .filter((uid) => {
                if (search === '') {
                  return uid;
                } else if (uid.includes(search)) {
                  return uid;
                }
              })
              .map((uid) => <ChatProfile uid={uid} key={uid} />)}
        </div>

        {isLoaded && !contacts && (
          <p className="text-white text-center">No contacts yet!</p>
        )}

        <div className="mt-24"></div>

        <Footer />
      </div>
    </>
  );
}

export default ChatDashboard;
