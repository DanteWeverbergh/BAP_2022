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
  const [chats, setChats] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [contactsLoaded, setContactsLoaded] = useState(false);

  const [search, setSearch] = useState('');

  useEffect(() => {
    //

    let unmounted = false;

    db.collection('users')
      .doc(user.uid)
      .onSnapshot((doc) => {
        if (!unmounted) {
          setContacts(doc.data().chat);
        }
      });

    setIsLoaded(true);

    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    //

    if (contacts.length !== 0) {
      contacts.map((uid) => {
        const usersArray = [user.uid, uid];

        const otherUser = uid;

        db.collection('chat')
          .orderBy('lastUpdated', 'desc')
          .where('users', 'array-contains-any', usersArray)
          .onSnapshot((snapshot) => {
            setChats(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          });
      });
    }

    setContactsLoaded(true);
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
          {contactsLoaded &&
            chats &&
            chats.map(({ data, id }) => (
              <ChatProfile id={id} key={id} data={data} />
            ))}
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
