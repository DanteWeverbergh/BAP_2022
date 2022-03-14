import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import { IoIosCalculator, IoIosFitness } from 'react-icons/io';

class Footer extends Component {
  render() {
    return (
      <>
        <div className="fixed inset-x-0 bottom-0 h-16 bg-slate-800 drop-shadow-lg ">
          <nav className="flex justify-between text-4xl text-white">
            <Link to={'/home'}>
              <MdHome className="" />
            </Link>
            <Link to={'/log'}>
              <IoIosFitness />
            </Link>
            <Link to={'/calculator'}>
              <IoIosCalculator />
            </Link>
          </nav>
        </div>
      </>
    );
  }
}

export default Footer;
