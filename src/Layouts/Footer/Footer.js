import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-red-500">
          <nav className="flex justify-between">
            <Link to={'/home'}>Home</Link>
            <Link to={'/log'}>Log</Link>
            <Link to={'/calculator'}>Calculator</Link>
          </nav>
        </div>
      </>
    );
  }
}

export default Footer;
