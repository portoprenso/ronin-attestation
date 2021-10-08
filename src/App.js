import { Provider } from "mobx-react";
import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AddProduct from "./components/AddProduct/AddProduct";
import Layout from "./components/Layout/Layout";
// import ToDo from "./components/ToDo/ToDo";
import ProductList from "./components/ProductList/ProductList";
import productsStore from "./components/store/productsStore";
import HomePage from './components/HomePage/HomePage';
class App extends Component {
  render() {
    return (
      <Provider productsStore={productsStore}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/addproduct" component={AddProduct} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
