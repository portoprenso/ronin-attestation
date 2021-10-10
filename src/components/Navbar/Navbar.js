import React, { Component } from 'react';
import logo from '../../assets/logo-main.png'
import searchIcon from '../../assets/searchIcon.svg'
import '../Navbar/Navbar.scss'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@inject("authStore")
@observer
class Navbar extends Component {
  render() {

    const handleLogout = async () => {
      if(this.props.authStore.currentUser){
        const response = await this.props.authStore.logout()
        this.props.history.push("/")
      } else {
        this.props.history.push("/signin")
      }
    }


    console.log(!!this.props.authStore.currentUser)
    return (
      <nav className="navbar-main">
        <div className="navbar-main__nav-left">
          <img src={logo} className="navbar-main__logo" alt="main-logo"/>
        </div>
        <div className="navbar-main__nav-right">
          <div className="navbar-main__nav-right__input">
            <img src={searchIcon} alt="search-icon"/>
            <input placeholder="Find your course"/>
          </div>
          <ul className="navbar-main__nav-right__menu">
            <li className="navbar-main__nav-right__menu__item">
              <Link to="/">Home</Link>
              </li>
            <li className="navbar-main__nav-right__menu__item"><Link to="/addproduct">AddProduct</Link></li>
            <li className="navbar-main__nav-right__menu__item"><Link to="#">Cart</Link></li>
            {this.props.authStore.currentUser && <li className="navbar-main__nav-right__menu__item"><Link to="/myprofile">My profile</Link></li>}
            <li onClick={handleLogout} className="navbar-main__nav-right__menu__item">Sign {this.props.authStore.currentUser ? "out" : "in"}</li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);