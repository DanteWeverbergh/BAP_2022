import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  state = {
    isActive: false,
  };

  render() {
    return (
      <>
        <header className="mb-16 ">
          <Link to={'/'}>
            <h1 className="text-3xl text-red-500 absolute top-0 left-0 ml-5 mt-5">
              Gains
            </h1>
          </Link>

          <Link
            to={'/profile'}
            className="w-10 h-10 bg-red-500 rounded-full absolute top-0 right-0 mr-5 mt-5"
          ></Link>
        </header>
      </>
    );
  }
}

export default Header;
