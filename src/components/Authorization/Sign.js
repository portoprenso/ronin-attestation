import React, { Component } from "react";
import "./Sign.scss";
import { inject, observer } from "mobx-react";
import { withRouter, Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";


@inject("authStore", "productsStore")
@observer
class Sign extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      passwordCheck: "",
      error: false
    };
  }
  render() {
    console.log("THIS IS SIGN PAGE", this.props.history.location.pathname);
    let title;
    switch (this.props.history.location.pathname) {
      case "/signin":
        title = "Sign in";
        break;
      case "/signup":
        title = "Sign up";
        break;
      case "/resetpass":
        title = "Reset password";
        break;
      default:
        break;
    }

    const signUpWithEmailWithInputCheck = async (e, user) => {
      e.preventDefault();
      const isEmailValid = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g.test(this.state.email)
      const isPasswordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g.test(this.state.password)
      console.log(this.state.password, isPasswordValid)
      if(this.state.password !== this.state.passwordCheck || !isPasswordValid || !isEmailValid) {
        this.setState({error: true});
        console.log(this.state.error);
        return;
      };
      if(!this.state.error) {
        if (await this.props.authStore.signUpWithEmail(user)){
        this.setState({error: false})
        this.props.history.push('/')
        } else {
          this.setState({error: true})
        }
      }
    }
    
    const signInWithEmailWithInputCheck = async (e, user) => {
      e.preventDefault();
      const isEmailValid = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g.test(this.state.email)
      const isPasswordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g.test(this.state.password)
      console.log(this.state.password, isPasswordValid)
      if(!this.state.password || !isPasswordValid || !isEmailValid) {
        this.setState({error: true});
        console.log(this.state.error);
        return;
      };
      if(!this.state.error) {
        if (await this.props.authStore.loginWithEmail(user)){
        this.setState({error: false})
        this.props.history.push('/')
        } else {
          this.setState({error: true})
        }
      }
    }

    // console.log(this.props.authStore.currentUser.displayName)
    
    return (
      <div className="sign">
        <div className="sign__modal">
          {this.state.error &&
          <div className="error">
            Please type in correct email and password
          </div>
          }
          <div>{title}</div>
          <form className="sign__modal__inputs">
            <input onChange={(e) => this.setState({email: e.target.value})} required type="email" placeholder="E-Mail" />
            <input onChange={(e) => this.setState({password: e.target.value})} required type="password" placeholder="Password" />
            {this.props.history.location.pathname === "/signup" && 
              <>
                <input onChange={(e) => this.setState({passwordCheck: e.target.value})} required type="password" placeholder="Password again" />
                <button onClick={(e) => {signUpWithEmailWithInputCheck(e, {email: this.state.email, password: this.state.password})}}>{title}</button>
              </>
            }
            {this.props.history.location.pathname === "/signin" && 
              <button onClick={(e) => {signInWithEmailWithInputCheck(e, {email: this.state.email, password: this.state.password})}}>{title} with Email</button>
            }
          </form>
          <div onClick={this.props.authStore.loginWithGoogle}>
            Sign in with 
            <GoogleIcon />
          </div>
          {this.props.authStore.currentUser && <div onClick={this.props.authStore.logout}>Signout</div>}
          {title === "Sign in" &&
            <p>Don't have an account? <Link to="/signup">Sign up now</Link></p>
          }
          {title === "Sign up" &&
            <p>Already have an account? <Link to="/signin">Sign in</Link></p>
          }
        </div>
        <div className="sign__propose"></div>
      </div>
    );
  }
}

export default withRouter(Sign);