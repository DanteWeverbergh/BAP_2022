import React, { useEffect } from 'react';
import { useAuthContext } from '../../../Context/AuthContext';

function ChatBubble({ message }) {
  const { user } = useAuthContext();

  return (
    <>
      {user.uid === message.uid ? (
        <li class="flex justify-end">
          <div class="relative max-w-xl px-4 py-2 text-slate-950 bg-white-950 rounded shadow">
            <span class="block">{message.message}</span>
          </div>
        </li>
      ) : (
        <li class="flex justify-start ">
          <div class="relative max-w-xl px-4 py-2 text-white-950 bg-blue-950 rounded shadow ">
            <span class="block">{message.message}</span>
          </div>
        </li>
      )}
    </>
  );
}

export default ChatBubble;
