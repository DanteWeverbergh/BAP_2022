import React, { useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import Input from '../../../Components/Input';
import { useAuthContext } from '../../../Context/AuthContext';
import { sendMessage } from '../../../Libs/Firestore';

function ChatInput({ chatId }) {
  const [message, setMessage] = useState('');

  const { user } = useAuthContext();

  useEffect(() => {
    console.log('input', chatId);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(message, user.uid, chatId);
  };
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 py-4 rounded-md z-50 mt-12 bg-slate-950">
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
            <IoSend className="text-blue-950 text-2xl" />
          </button>
        </form>
      </div>
    </>
  );
}

export default ChatInput;
