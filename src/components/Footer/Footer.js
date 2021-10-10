import React, { Component } from "react";
import logo from "../../assets/logo-main.png";
import "./Footer.scss";
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <div className="footer__container">
        <div className="footer__container__left">
          <img src={logo} className="footer__container__left__image" alt="main logo"/>
        </div>
        <div className="footer__container__right">
          <div className="footer__container__right__links">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/addproduct">AddProduct</Link></li>
              <li><Link to="#">Cart</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
