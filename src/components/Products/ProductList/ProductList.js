import React, { Component } from "react";
// import { getProducts } from "../helpers/functions";
import { inject, observer } from "mobx-react";
import './ProductList.scss'
import ProductCard from '../ProductCard/ProductCard';
import LoaderSpinner from "../../LoaderSpinner/LoaderSpinner";
import { toJS } from "mobx";

@inject("productsStore")
@observer
class ProductList extends Component {
    // constructor() {
    //   super();
    // }
  async componentDidMount() {
    this.props.productsStore.getProducts();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(toJS(
      prevProps.productsStore.products),
      toJS(this.props.productsStore.products)
    );
    //   if(prevProps.productsStore.products !== this.props.productsStore.products){
    //     console.log("qwe")
    //   }
    // console.log(`SJDGKHSDKJH`, this.props.productsStore.products);
  }

  render() {
    // let { products } = this.props.productsStore
    return (
      <div className="product-list__container">
        {!this.props.productsStore.pending ? (
          this.props.productsStore.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <LoaderSpinner />
        )}
      </div>
    );
  }
}

export default ProductList;