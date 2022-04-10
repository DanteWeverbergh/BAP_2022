import React, { useEffect, useState, useRef } from 'react';
import { db } from '../../../Libs/Firebase';
import ChatBubble from './ChatBubble';

function ChatMessage({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  //scroll to bottom
  const messageEndRef = useRef(null);

  useEffect(() => {
    //

    db.collection('chat')
      .doc(chatId)
      .collection('messages')
      .orderBy('created')
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    //scroll to bottom when there is a new message
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <>
      <ul class="space-y-2 mt-6">
        {isLoaded &&
          messages.map((message) => <ChatBubble message={message} />)}
      </ul>

      {/**
       * div for scroll
       */}
      <div className="mt-24" ref={messageEndRef}></div>

      {isLoaded && !messages && (
        <p className="text-white text-center mt-4">No message yet!</p>
      )}
    </>
  );
}

export default ChatMessage;
