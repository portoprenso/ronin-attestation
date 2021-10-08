import React, { Component } from "react";
import ProductCard from "../ProductCard/ProductCard";
// import { getProducts } from "../helpers/functions";
import { inject, observer } from "mobx-react";

@inject("productsStore")
@observer
class ProductList extends Component {
    constructor() {
      super();
    }
  async componentDidMount() {
    this.props.productsStore.getProducts();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(
      prevProps.productsStore.products,
      this.props.productsStore.products
    );
    //   if(prevProps.productsStore.products !== this.props.productsStore.products){
    //     console.log("qwe")
    //   }
    // console.log(`SJDGKHSDKJH`, this.props.productsStore.products);
  }

  render() {
    // let { products } = this.props.productsStore
    return (
      <div>
        <h2>KJHDKJHS</h2>
        {this.props.productsStore.products.length > 0 ? (
          this.props.productsStore.products.map((product) => (
            <ProductCard product={product} />
          ))
        ) : (
          <h2>There are no products</h2>
        )}
      </div>
    );
  }
}

export default ProductList;