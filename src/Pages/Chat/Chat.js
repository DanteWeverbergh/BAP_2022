import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import { db } from '../../Libs/Firebase';
import ChatHeader from './Components/ChatHeader';
import ChatInput from './Components/ChatInput';
import ChatMessage from './Components/ChatMessage';

function Chat() {
  let { uid } = useParams();
  const { user } = useAuthContext();

  const [chat, setChat] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const array1 = [uid, user.uid];
    const array2 = [user.uid, uid];

    db.collection('chat').onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        if (
          JSON.stringify(array1) === JSON.stringify(doc.data().users) ||
          JSON.stringify(array2) === JSON.stringify(doc.data().users)
        ) {
          //
          setChat({
            id: doc.id,
            chat: doc.data(),
          });
        }
      });
    });

    setIsLoaded(true);
  }, []);

  return (
    <>
      <ChatHeader />

      {chat.id && <ChatMessage chatId={chat.id} />}
      {chat.id && <ChatInput chatId={chat.id} />}
    </>
  );
}

export default Chat;
