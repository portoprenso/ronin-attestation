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
      getProducts: action
    });
  }
  addProduct = async () => {
    this.products.push({
      title: "qweqwe",
      id: "54e6ri67tgiuhjklm",
      description: "lorem30",
      prime: 50,
      main_image: 'klgkGJHl238oh'
    })
  }
  getProducts = async () => {
    const q = query(
      collection(db, "products"),
      where("title", "==", "test_product")
    );
    const { _docs } = await getDocs(q);
    this.products = _docs.map((each) => {
      return each.data();
    });
    // return this.products;
  };
  // @observable products = [];
}

export default new productsStore();