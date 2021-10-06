import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import ToDo from './components/ToDo/ToDo';
import ProductList from './components/ProductList/ProductList';

class App extends Component {
  render() {
    return (
      <Layout>
        <ProductList/>
      </Layout>
    );
  }
}

export default App;