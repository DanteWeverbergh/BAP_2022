import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatHeader from './Components/ChatHeader';
import ChatInput from './Components/ChatInput';
import ChatMessage from './Components/ChatMessage';

function Chat() {
  let { uid } = useParams();

  useEffect(() => {
    console.log(uid);
  }, []);

  return (
    <>
      <ChatHeader />

      <ChatMessage />

      <ChatInput />
    </>
  );
}

export default Chat;
