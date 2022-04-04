import React, { useEffect } from 'react';
import { useAuthContext } from '../../../Context/AuthContext';

function ChatBubble({ message }) {
  const { user } = useAuthContext();

  return (
    <>
      {user.uid === message.uid ? (
        <li class="flex justify-end">
          <div class="relative max-w-xl px-4 py-2 text-white bg-slate-400 rounded shadow">
            <span class="block">{message.message}</span>
          </div>
        </li>
      ) : (
        <li class="flex justify-start ">
          <div class="relative max-w-xl px-4 py-2 text-white bg-blue-500 rounded shadow ">
            <span class="block">{message.message}</span>
          </div>
        </li>
      )}
    </>
  );
}

export default ChatBubble;
