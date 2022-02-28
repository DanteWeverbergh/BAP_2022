import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  state = {
    isActive: false,
  };

  render() {
    return (
      <>
        <header>
          <div>Header</div>
          <nav>
            <Link to={'/'}>Home</Link>
            <Link to={'/calculator'}>Calculator</Link>
            <Link to={'/log'}>Log</Link>
          </nav>
        </header>
      </>
    );
  }
}

export default Header;
