import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import { IoIosCalculator, IoIosFitness } from 'react-icons/io';

function Footer() {
  const [logActive, setLogeActive] = useState(false);
  const [homeActive, setHomeActive] = useState(false);
  const [calculatorActive, setCalculatorActive] = useState(false);

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
        </nav>
      </div>
    </>
  );
}

export default Footer;
