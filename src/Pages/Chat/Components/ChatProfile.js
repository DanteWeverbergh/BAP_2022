import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ChatProfile({ type }) {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <>
      <Link
        to={'/chat/1234'}
        className="bg-slate-700 w-full py-2 rounded-md mt-4 flex relative"
      >
        <img
          className="h-12 w-12 rounded-full ml-4"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          alt="profile"
        />

        <div className="ml-4">
          <h1>Naam</h1>
          <p>Bericht</p>
        </div>

        {isOnline ? (
          <div className="absolute right-4 top-0-4 bg-green-400 h-2 w-2 rounded-full"></div>
        ) : (
          <div className="absolute right-4 top-0-4 bg-red-400 h-2 w-2 rounded-full"></div>
        )}
      </Link>
    </>
  );
}

export default ChatProfile;
