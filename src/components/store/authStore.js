import {
  action,
  autorun,
  configure,
  observable,
  makeAutoObservable,
  makeObservable,
} from "mobx";
import { getProducts } from "./../helpers/functions";

import {
  doc,
  getDoc,
  collection,
  collectionGroup,
  getDocs,
  query,
  where,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore/lite";

import { auth, db } from "../firebase";

import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  deleteUser,
  getIdToken,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
  updateEmail,
  updatePassword,
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

    // this.currentUser = { ...user.user, from: "google" };
    const userToSave = {
      accessToken: user.accessToken,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      uid: user.uid,
      phoneNumber: user.phoneNumber,
      displayName: user.displayName,
      accessToken: user.accessToken,
      from: "google"
    }
    this.currentUser = Object.assign({}, userToSave);
    console.log(this.currentUser);
    console.log(Object.assign({}, userToSave));
    console.log(JSON.parse(JSON.stringify(userToSave)));
  };

  signUpWithEmail = async (user) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      this.currentUser = { ...user.user, from: "email" };
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

  // addProduct = async (product) => {
  //   this.products.push(product);
  //   setDoc(doc(collection(db, "products"), `/${product.id}`), product);
  // };

  // deleteProduct = async (id) => {
  //   this.products = this.products.filter((item) => {
  //     return item.id !== id;
  //   });
  //   await deleteDoc(doc(collection(db, "products"), `/${id}`));
  // };

  // getProducts = async () => {
  //   const q = query(collection(db, "products"));
  //   const { _docs } = await getDocs(q);
  //   this.products = _docs.map((each) => {
  //     return each.data();
  //   });
  // };

  // getCategories = async () => {
  //   const q = query(collection(db, "categories"));
  //   const { _docs } = await getDocs(q);
  //   this.categories = _docs.map((each) => {
  //     return each.data();
  //   });
  // };
}

export default new authStore();
