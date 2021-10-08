import React, { Component } from 'react';
import AddProduct from '../AddProduct/AddProduct';
import ProductList from '../ProductList/ProductList';

class HomePage extends Component {
  render() {
    return (
      <>
        <ProductList />
      </>
    );
  }
}

export default HomePage;