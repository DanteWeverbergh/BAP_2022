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
  const [contactsFull, setContactsFull] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const [search, setSearch] = useState('');

  useEffect(() => {
    //

    let unsubscribe;

    unsubscribe = db
      .collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        setContacts(doc.data().chat);
      });

    if (contacts) {
      contacts.map((uid) => {
        setContactsFull(
          db
            .collection('users')
            .doc(uid)
            .get()
            .then((doc) => doc.data())
        );
      });
    }

    setIsLoaded(true);

    return unsubscribe;
  }, []);

  return (
    <>
      <div className="z-10">
        <Header />

        <ChatSearch search={search} setSearch={setSearch} />

        {/*       <OnlineUsers />
         */}

        <button onClick={() => console.log(contactsFull)}> test</button>

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

        <Footer />
      </div>
    </>
  );
}

export default ChatDashboard;
