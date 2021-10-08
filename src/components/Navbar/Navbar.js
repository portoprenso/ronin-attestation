import React, { Component } from 'react';
import logo from '../../../assets/logo-main.png'
import './Navbar.scss'

class Navbar extends Component {
  

  render() {
    return (
      <nav className="navbar-main">
        <div className="navbar-main__nav-left">
          <img src={logo} className="navbar-main__logo"/>
        </div>
        <div className="navbar-main__nav-right">
          <ul className="navbar-main__nav-right__menu">
            <li className="navbar-main__nav-right__menu__item"><a>Home</a></li>
            <li className="navbar-main__nav-right__menu__item"><a>AddProduct</a></li>
            <li className="navbar-main__nav-right__menu__item"><a>Cart</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;