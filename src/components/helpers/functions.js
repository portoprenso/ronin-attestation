import {db} from "../firebase";

export const getProducts = async () => {
    const productsRef = await db.collection("products");
    return productsRef.docs.map(product => product)
}