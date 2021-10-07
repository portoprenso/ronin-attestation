import { Provider } from "mobx-react";
import React, { Component } from "react";
import AddProduct from "./components/AddProduct/AddProduct";
import Layout from "./components/Layout/Layout";
// import ToDo from "./components/ToDo/ToDo";
import ProductList from "./components/ProductList/ProductList";
import productsStore from './components/store/productsStore'
class App extends Component {
  render() {
    return (
      <Provider productsStore={productsStore}>
          <Layout>
            <ProductList />
            <AddProduct />
          </Layout>
      </Provider>
    );
  }
}

export default App;
