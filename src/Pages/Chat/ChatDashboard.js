import React, { useState } from 'react';
import Footer from '../../Layouts/Footer/Footer';
import Header from '../../Layouts/Header/Header';
import ChatProfile from './Components/ChatProfile';
import ChatSearch from './Components/ChatSearch';
import OnlineUsers from './Components/OnlineUsers';

function ChatDashboard() {
  const [onlineUsers, setOnlineUsers] = useState([]);

  return (
    <>
      <div className="z-10">
        <Header />

        <ChatSearch />

        {/*       <OnlineUsers />
         */}

        <div className="flex flex-col items-center mx-12">
          <ChatProfile type="chat" />
          <ChatProfile />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default ChatDashboard;
