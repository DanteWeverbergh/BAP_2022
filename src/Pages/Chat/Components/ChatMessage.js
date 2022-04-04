import React, { useEffect, useState } from 'react';
import { db } from '../../../Libs/Firebase';

function ChatMessage() {
  const [messages, setMessages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //
    let unsubcibe;

    unsubcibe = db
      .collection('chat')
      .orderBy('created', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            message: doc.data(),
          }))
        );
      });

    setIsLoaded(true);

    return unsubcibe;
  }, []);

  return (
    <>
      {isLoaded &&
        messages.map(({ id, message }) => (
          <div className=" relative w-24 bg-blue-400 h-20 rounded-md items-center flex justify-center">
            <p>{message.message}</p>
          </div>
        ))}

      <button onClick={() => console.log(messages)}>Test</button>
    </>
  );
}

export default ChatMessage;
