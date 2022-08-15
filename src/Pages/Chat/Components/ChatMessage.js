import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../Libs/Firebase';
import ChatBubble from './ChatBubble';

function ChatMessage() {
  let { chatid } = useParams();
  const [messages, setMessages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  //scroll to bottom
  const messageEndRef = useRef(null);

  useEffect(() => {
    //

    console.log(chatid);

    db.collection('chats')
      .doc(chatid)
      .collection('messages')
      .orderBy('created')
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    //scroll to bottom when there is a new message
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <>
      <ul className="space-y-2 mt-6 mx-12">
        {isLoaded &&
          messages.map(({ id, data }) => (
            <ChatBubble key={id} message={data} />
          ))}
      </ul>

      {/**
       * div for scroll
       */}
      <div className="mt-24" ref={messageEndRef}></div>
    </>
  );
}

export default ChatMessage;
