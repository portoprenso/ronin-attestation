import React, { Component } from 'react';
import logo from '../../assets/logo-main.png'
import searchIcon from '../../assets/searchIcon.svg'
import '../Navbar/Navbar.scss'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebase';


@inject("authStore", "productsStore")
@observer
class Navbar extends Component {
  async componentDidMount() {
    if(!this.props.productsStore.cart) this.props.productsStore.getCart();
    onAuthStateChanged(auth, (user) => {
      // console.log(user)
      this.props.authStore.currentUser = user
    })
  
  }

  render() {

    const handleLogout = async () => {
      if(this.props.authStore.currentUser){
        const response = await this.props.authStore.logout()
        this.props.history.push("/")
      } else {
        this.props.history.push("/signin")
      }
    }

    console.log(this.props.authStore.currentUser)

    const findProduct = (e) => {
      const regex = new RegExp(`${e.target.value}`, "gi")
      this.props.productsStore.products = this.props.productsStore.productsCopy.filter(item => {
        let flag = false
        if(regex.test(item.title) || regex.test(item.description)) flag = true
        return flag
      })
    }

    // console.log(!!this.props.authStore.currentUser)
    // console.log(this.props.history)
    return (
      <nav className="navbar-main">
        <nav role="navigation">
          <div id="menuToggle">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            
            <ul id="menu">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/addproduct">AddProduct</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              {this.props.authStore.currentUser && <li><Link to={`/profile/${this.props.authStore.currentUser.uid}`}>My profile</Link></li>}
              <li onClick={handleLogout} >Sign {this.props.authStore.currentUser ? "out" : "in"}</li>
            </ul>
          </div>
        </nav>
        <div className="navbar-main__nav-left">
          <img src={logo} className="navbar-main__logo" alt="main-logo"/>
        </div>
        <div className="navbar-main__nav-right">
          <div className="navbar-main__nav-right__input">
            <img src={searchIcon} alt="search-icon"/>
            <input placeholder="Find your course" onInput={findProduct}/>
          </div>
          <ul className="navbar-main__nav-right__menu">
            <li className="navbar-main__nav-right__menu__item">
              <Link to="/">Home</Link>
              </li>
            <li className="navbar-main__nav-right__menu__item"><Link to="/addproduct">AddProduct</Link></li>
            <li className="navbar-main__nav-right__menu__item"><Link to="/cart">Cart</Link></li>
            {this.props.authStore.currentUser && <li className="navbar-main__nav-right__menu__item"><Link to={`/profile/${this.props.authStore.currentUser.uid}`}>My profile</Link></li>}
            <li onClick={handleLogout} className="navbar-main__nav-right__menu__item">Sign {this.props.authStore.currentUser ? "out" : "in"}</li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);