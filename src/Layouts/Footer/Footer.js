import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import { IoIosCalculator, IoIosFitness, IoMdChatbubbles } from 'react-icons/io';
import { IoChatbubble, IoChatbubbles } from 'react-icons/io5';

function Footer() {
  const [logActive, setLogeActive] = useState(false);
  const [homeActive, setHomeActive] = useState(false);
  const [calculatorActive, setCalculatorActive] = useState(false);
  const [chatActive, setChatActive] = useState(false);

  const location = useLocation();

  useEffect(() => {
    //
    const path = location.pathname;

    if (path === '/' || path === '/home') {
      setHomeActive(true);
    } else if (path === '/log') {
      setLogeActive(true);
    } else if (path === '/calculator') {
      setCalculatorActive(true);
    } else if (path === '/chat') {
      setChatActive(true);
    }
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 py-5 bg-slate-800 opacity-90 ">
        <nav className="flex justify-around content-center  text-4xl text-white">
          <Link to={'/home'}>
            <MdHome className={homeActive ? 'text-blue-500' : 'text-white'} />
          </Link>
          <Link to={'/log'}>
            <IoIosFitness
              className={logActive ? 'text-blue-500' : 'text-white'}
            />
          </Link>
          <Link to={'/calculator'}>
            <IoIosCalculator
              className={calculatorActive ? 'text-blue-500' : 'text-white'}
            />
          </Link>
          <Link to={'/chat'}>
            <IoChatbubbles
              className={chatActive ? 'text-blue-500' : 'text-white'}
            />
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Footer;
