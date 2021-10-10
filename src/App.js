import { Provider } from "mobx-react";
import { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
// import productsStore from "./components/store/productsStore";
import HomePage from './components/HomePage/HomePage';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AddProduct from "./components/Products/AddProduct/AddProduct";
import productsStore from "./components/store/productsStore";
import authStore from "./components/store/authStore";
import Sign from './components/Authorization/Sign';

class App extends Component {
  render() {
    return (
      <Provider productsStore={productsStore} authStore={authStore}>
        <Router>
          <Navbar />
          <Layout>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/addproduct" component={AddProduct} />
              <Route exact path="/signin" component={Sign} />
              <Route exact path="/signup" component={Sign} />
            </Switch>
          </Layout>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
