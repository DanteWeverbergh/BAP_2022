import React, { useState } from 'react';
import Back from '../../../Components/Back';

function ChatHeader() {
  return (
    <>
      <div className="flex h-16 bg-slate-700 items-center justify-between rounded-b-md">
        <Back link={'/chat'} />
        <div className="mr-6 flex items-center">
          <div className="text-white text-2xl ml-4">
            <h1>Naam</h1>
          </div>

          <img
            className="h-12 w-12 rounded-full ml-4"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            alt="profile"
          />
        </div>
      </div>
    </>
  );
}

export default ChatHeader;
