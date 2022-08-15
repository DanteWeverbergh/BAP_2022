import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import { db } from '../../Libs/Firebase';
import ChatHeader from './Components/ChatHeader';
import ChatInput from './Components/ChatInput';
import ChatMessage from './Components/ChatMessage';

function Chat() {
  let { chatid } = useParams();
  const { user } = useAuthContext();

  const [chat, setChat] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [contactUid, setContactUid] = useState('');

  useEffect(() => {
    let mounted = false;

    console.log(chatid);

    db.collection('chats')
      .doc(chatid)
      .get()
      .then((doc) => {
        if (!mounted) {
          console.log(doc.data().users);
          doc.data().users.map((id) => {
            if (user.uid !== id) {
              setContactUid(id);
              console.log(id);
              setIsLoaded(true);
            }
          });
        }
      });

    // const array1 = [uid, user.uid];
    // const array2 = [user.uid, uid];

    // db.collection('chat').onSnapshot((snapshot) => {
    //   snapshot.docs.map((doc) => {
    //     if (
    //       JSON.stringify(array1) === JSON.stringify(doc.data().users) ||
    //       JSON.stringify(array2) === JSON.stringify(doc.data().users)
    //     ) {
    //       //
    //       if (!mounted) {
    //         setChat({
    //           id: doc.id,
    //           chat: doc.data(),
    //         });
    //       }
    //     }
    //   });
    // });

    //setIsLoaded(true);

    return () => {
      mounted = true;
    };
  }, []);

  return (
    <>
      {isLoaded && <ChatHeader contactUid={contactUid} />}

      <div className="mt-24"></div>

      <div>
        <ChatInput />
      </div>

      <ChatMessage />
    </>
  );
}

export default Chat;
