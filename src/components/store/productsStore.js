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
  updateDoc
} from "firebase/firestore/lite";

import _ from 'lodash'

import { db } from "../firebase";

class productsStore {
  constructor() {
    // super();
    this.products = [];
    this.categories = [];
    this.currentProduct = null;
    makeObservable(this, {
      products: observable,
      categories: observable,
      currentProduct: observable,
      getProducts: action,
      getCategories: action,
      addProduct: action,
      getSpecifiedProduct: action,
      deleteProduct: action,
    });
  }

  addProduct = async (product) => {
    this.products.push(product);
    const productWithoutCollections = _.omit(product, ["achievements", "achievements_input", "certificate"])
    const collectionsFromProduct = _.pick(product, ["achievements", "certificate"])
    const docRef = await doc(collection(db, "products"), `/${product.id}`)
    const response = await setDoc(docRef, productWithoutCollections);
    // const collectionRef = await addDoc(collection(docRef, "extraprops"), collectionsFromProduct)
    const collectionRef = await setDoc(doc(collection(docRef, "extraprops"), `/extraData`), collectionsFromProduct)
    console.warn(collectionRef)
  }

  deleteProduct = async (id) => {
    this.products = this.products.filter(item => {
      return item.id !== id
    })
    await deleteDoc(doc(collection(db, "products"), `/${id}`));
  }

  getProducts = async () => {
    const q = query(
      collection(db, "products"),
    );
    const { _docs } = await getDocs(q);
    this.products = _docs.map((each) => {
      return each.data();
    });
  };

  getSpecifiedProduct = async (id) => {
    const docRef = await doc(db, `products/${id}`);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      this.currentProduct = await docSnap.data()
    } else {
      this.currentProduct = null
    }
  };

  getCategories = async () => {
    const q = query(
      collection(db, "categories"),
    );
    const { _docs } = await getDocs(q);
    this.categories = _docs.map((each) => {
      return each.data();
    });
  };
}

export default new productsStore();