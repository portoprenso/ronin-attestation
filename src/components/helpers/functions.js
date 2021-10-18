import {
  // doc,
  // getDoc,
  collection,
  collectionGroup,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { db } from "../firebase";

export const getProducts = async () => {
  const productsRef = await collection(db, "/products");
  //   console.warn(productsRef);
  const collectionSnap = await collectionGroup(db, "products");
  //   console.warn(collectionSnap);
  const q = query(
    collection(db, "products"),
    where("title", "==", "test_product")
  );
  const { _docs } = await getDocs(q);
  const result = _docs.map((each) => {
    return each.data();
  });
  //   console.warn(`DOCSREFDOCSREFDOCSREFDOCSREF`, _docs)
  //   const documentRef = await doc(db, "products/nYEgLbIbXDfQbXMtUfCE");
  //   const snapshot = await getDoc(documentRef);
  //   const data = { ...snapshot.data() };
  //   console.warn(data);

  return result;

  // const productsRef = await db.collection("products");
  //   return productsRef.docs.map((product) => product);
};

export function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){//Use timestamp until depleted
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}