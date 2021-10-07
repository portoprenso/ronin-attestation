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
  deleteDoc
} from "firebase/firestore/lite";
import { db } from "../firebase";

class productsStore {
  constructor() {
    // super();
    this.products = [];
    this.categories = [];
    makeObservable(this, {
      products: observable,
      categories: observable,
      getProducts: action,
      getCategories: action,
      addProduct: action
    });
  }

  addProduct = async (product) => {
    this.products.push(product);
    setDoc(doc(collection(db, "products"), `/${product.id}`), product);
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