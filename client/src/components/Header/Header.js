import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: 'Anonymous'
    };
  }



  render() {
    return (
      <div>
        <header>
          <div className='wrapper'>
            <h1 className='logo'>Collabs</h1>
            <p className='logged-user'>Logged in as {this.state.userName}</p>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
