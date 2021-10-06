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
