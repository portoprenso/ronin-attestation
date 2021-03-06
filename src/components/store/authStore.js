import {
  // action,
  // autorun,
  // configure,
  observable,
  // makeAutoObservable,
  makeObservable,
} from "mobx";

import { auth } from "../firebase";

import {
  createUserWithEmailAndPassword,
  // getRedirectResult,
  onAuthStateChanged,
  // deleteUser,
  // getIdToken,
  // sendEmailVerification,
  // sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  // updateCurrentUser,
  // updateEmail,
  // updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "@firebase/auth";

class authStore {
  constructor() {
    // super();
    this.currentUser = null;
    // this.categories = [];
    makeObservable(this, {
      currentUser: observable,
      // categories: observable,
      // getProducts: action,
      // getCategories: action,
      // addProduct: action
    });
  }


  loginWithGoogle = async () => {
    const {user} = await signInWithPopup(auth, new GoogleAuthProvider());
    console.log(user)
    localStorage.setItem("accessToken", JSON.stringify(user.accessToken));

    // this.currentUser = { ...user.user, from: "google" };
    const userToSave = {
      accessToken: user.accessToken,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      uid: user.uid,
      phoneNumber: user.phoneNumber,
      displayName: user.displayName,
      from: "google"
    }
    this.currentUser = Object.assign({}, userToSave);
    console.log(this.currentUser);
    console.log(Object.assign({}, userToSave));
    console.log(JSON.parse(JSON.stringify(userToSave)));


  };

  signUpWithEmail = async (user) => {
    try {
      const userFromResponse = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      this.currentUser = { ...userFromResponse.user, from: "email" };
      return true
    } catch (error) {
      console.log("111111111111111111111111111111111111111111111111", error)
      return false
    }
  };

  logout = async () => {
    let answer = window.confirm("Do you really want to quit?")
    if(answer){
      const response = await signOut(auth);
      this.currentUser = null
    }
  };

  loginWithEmail = async (user) => {
    try {
      const user = await signInWithEmailAndPassword(auth, user.email, user.password)
      this.currentUser = { ...user.user, from: "email" };
      return true
    } catch (error) {
      console.log("111111111111111111111111111111111111111111111111", error)
      return false
    }
  }
}

export default new authStore();
