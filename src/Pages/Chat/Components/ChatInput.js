import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import Input from '../../../Components/Input';
import { useAuthContext } from '../../../Context/AuthContext';
import { sendMessage } from '../../../Libs/Firestore';

function ChatInput() {
  const [message, setMessage] = useState('');

  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(message, user.uid);
  };
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 ">
        <form className="flex" onSubmit={handleSubmit} method="POST">
          <Input
            type={'text'}
            placeholder={'Start typing ...'}
            name="message"
            value={message}
            onChange={({ target }) => setMessage(target.value)}
            id="message"
          />

          <button className="mx-4" type="submit">
            <IoSend className="text-white text-2xl" />
          </button>
        </form>
      </div>
    </>
  );
}

export default ChatInput;
