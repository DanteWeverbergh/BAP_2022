import React, { useEffect, useState } from 'react';
import { db } from '../../../Libs/Firebase';
import ChatBubble from './ChatBubble';

function ChatMessage({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //

    let unsubcibe;

    db.collection('chat')
      .doc(chatId)
      .collection('messages')
      .orderBy('created')
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });

    setIsLoaded(true);

    return unsubcibe;
  }, []);

  return (
    <>
      <ul class="space-y-2">
        {isLoaded &&
          messages.map((message) => <ChatBubble message={message} />)}
      </ul>

      {isLoaded && !messages && (
        <p className="text-white text-center mt-4">No message yet!</p>
      )}
    </>
  );
}

export default ChatMessage;
