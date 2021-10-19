import {
  action,
  // autorun,
  // configure,
  observable,
  computed,
  // makeAutoObservable,
  makeObservable,
  // toJS,
} from "mobx";

import {
  doc,
  getDoc,
  collection,
  // collectionGroup,
  getDocs,
  query,
  // where,
  // addDoc,
  setDoc,
  deleteDoc,
  updateDoc
} from "firebase/firestore/lite";

import { createBrowserHistory } from 'history';


import _ from 'lodash'

import { db } from "../firebase";

class productsStore {
  constructor() {
    // super();
    this.products = [];
    this.productsCopy = [];
    this.filteredProducts = [];
    this.categories = [];
    this.cart = null;
    this.currentProduct = null;
    this.pending = false;
    this.errorOccured = false;
    this.usersFavorites = false;
    this.history = new createBrowserHistory();
    makeObservable(this, {
      products: observable,
      // filteredProducts: computed,
      categories: observable,
      currentProduct: observable,
      pending: observable,
      errorOccured: observable,
      usersFavorites: observable,
      cart: observable,
      getProducts: action,
      getCategories: action,
      addProduct: action,
      getSpecifiedProduct: action,
      deleteProduct: action,
      getCart: action,
      toggleProductInCart: action,
      checkIfProductInCart: action,
      toggleFavorite: action,
      getUsersFavorites: action,
      updateProduct: action
    });
  }

  addProduct = async (product) => {
    this.products.push(product);
    this.productsCopy.push(product);
    const productWithoutCollections = _.omit(product, ["achievements", "achievements_input", "certificate", "author"])
    const collectionsFromProduct = _.pick(product, ["achievements", "certificate", "author"])
    const docRef = await doc(collection(db, "products"), `/${product.id}`)
    const response = await setDoc(docRef, productWithoutCollections);
    // const collectionRef = await addDoc(collection(docRef, "extraprops"), collectionsFromProduct)
    const collectionRef = await setDoc(doc(collection(docRef, "extraprops"), `/extraData`), collectionsFromProduct)
    console.warn(collectionRef)
  }

  updateProduct = async (product) => {
    console.log(product)
    this.products = this.products.map(item => {
      if(item.id === product.id){
        return product
      } else return item
    });
    this.productsCopy = this.productsCopy.map(item => {
      if(item.id === product.id){
        return product
      } else return item
    });
    const productWithoutCollections = _.omit(product, ["achievements", "achievements_input", "certificate", "author"])
    const collectionsFromProduct = _.pick(product, ["achievements", "certificate", "author"])
    const docRef = await doc(collection(db, "products"), `/${product.id}`)
    const response = await updateDoc(docRef, productWithoutCollections);
    // const collectionRef = await addDoc(collection(docRef, "extraprops"), collectionsFromProduct)
    const collectionRef = await updateDoc(doc(collection(docRef, "extraprops"), `/extraData`), collectionsFromProduct)
    console.warn(collectionRef)
  }

  deleteProduct = async (id) => {
    this.products = this.productsCopy.filter(item => {
      return item.id !== id
    })
    await deleteDoc(doc(collection(db, "products"), `/${id}`));
  }

  getProducts = async () => {
    this.errorOccured = false;
    this.pending = true;
    const q = query(
      collection(db, "products"),
    );
    const { _docs } = await getDocs(q);
    this.products = _docs.map((each) => {
      return each.data();
    });
    this.productsCopy = JSON.parse(JSON.stringify(this.products))
    this.pending = false
  };

  getSpecifiedProduct = async (id) => {
    this.errorOccured = false;
    this.pending = true;
    try {
      const docRef = await doc(db, `products/${id}`);
      const docExtraRef = await doc(db, `products/${id}/extraprops/extraData`);
      const docSnap = await getDoc(docRef);
      const docExtraSnap = await getDoc(docExtraRef);
      if(docSnap.exists()){
        if(docExtraSnap.exists()){
          this.currentProduct = {...await docSnap.data(), ...await docExtraSnap.data()}
        } else {
          this.currentProduct = {...await docSnap.data()}
        }
      } else {
        this.currentProduct = null
      }
      // console.log(`!!!!!!!!!!!!!!!!!!!!!!!!`, toJS(this.currentProduct))
    } catch (error) {
      this.errorOccured = true;
    }
    this.pending = false;
  };

  // get findProduct (e) {
  //   const regex = new RegExp(`${e.target.value}`, "gi")
  //   return this.props.productsStore.products.filter(item => {
  //     let flag = false
  //     if(regex.test(item.title) || regex.test(item.description)) flag = true
  //     return flag
  //   });
  // }


  getCategories = async () => {
    const q = query(
      collection(db, "categories"),
    );
    const { _docs } = await getDocs(q);
    this.categories = _docs.map((each) => {
      return each.data();
    });
  };

  getCart = async () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if(!cart){
      localStorage.setItem("cart", JSON.stringify([]));
      cart = [];
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.cart = cart;
    // return this.cart;
  }

  toggleProductInCart = async (e, id, count=1) => {
    // let cart = JSON.parse(localStorage.getItem("cart"));
    // if(!cart){
    //   localStorage.setItem("cart", JSON.stringify([]));
    //   cart = [];
    // }
    if(e) e.target.classList.toggle("product_card__btn__in-cart")
    // console.log(e.target.classList)
    let filteredCart = this.cart.filter(item => item.id !== id)
    if(filteredCart.length === this.cart.length){
      this.cart.push({id, count});
    } else {
      this.cart = filteredCart;
    }
    localStorage.setItem("cart", JSON.stringify(this.cart));
    // this.cart = cart;
  }

  checkIfProductInCart = (id) => {
    return this.cart ? this.cart.some(item => item.id === id) : false
  }

  changeProductCountInCart = (id, symbol) => {
    switch (symbol) {
      case "+":
        if(this.cart.find(item => item.id === id).count >=0) this.cart.find(item => item.id === id).count++
        break;
        case "-":
          if(this.cart.find(item => item.id === id).count >=1) this.cart.find(item => item.id === id).count--
        break;
      default:
        break;
    }
    localStorage.setItem("cart", JSON.stringify(this.cart));
    console.log(this.cart.find(item => item.id === id))
  }

  calcSubTotalCart = () => {
    let sum = 0;
    for(let i = 0; i < this.cart.length; i++){
      sum += this.cart[i].count * this.products.find(item => item.id === this.cart[i].id).price
    }
    console.log(sum)
    return sum
  }

  emptyCart = () => {
    this.cart = [];
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  toggleFavorite = async (id, userId) => {
    this.products = this.products.map(item => {
      if(item.id !== id) return item;
      else {
        if(item.favorites.includes(userId)){
          return {...item, favorites: item.favorites.filter(fav => fav !== userId)}
        } else {
          return {...item, favorites: [...item.favorites, userId]}
        }
      }
    })
      const docRef = await doc(db, `products/${id}`);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        const docDataFavorites = await docSnap.data().favorites;
        docDataFavorites.includes(userId) ? updateDoc(docRef, {favorites: docDataFavorites.filter(item => item !== userId)}) : updateDoc(docRef, {favorites: [...docDataFavorites, userId]})
      }
      const docUserRef = await doc(db, `users/${userId}`);
      const docUserSnap = await getDoc(docUserRef);
      console.log(docUserSnap.data())
      if(docUserSnap.exists()){
        const docUserDataFavorites = await docUserSnap.data().favorites;
        docUserDataFavorites.includes(id) ? updateDoc(docUserRef, {favorites: docUserDataFavorites.filter(item => item !== id)}) : updateDoc(docUserRef, {favorites: [...docUserDataFavorites, id]})
      }
      // console.log(`!!!!!!!!!!!!!!!!!!!!!!!!`, toJS(this.currentProduct))
      // console.log(this.products)
  }

  getUsersFavorites = async (userId)=> {
    const docUserRef = await doc(db, `users/${userId}`);
    const docUserSnap = await getDoc(docUserRef);
    if(docUserSnap.exists()){
      this.usersFavorites = await docUserSnap.data().favorites;
    } else this.usersFavorites = [];
    console.log(this.usersFavorites)
  }
}

export default new productsStore();