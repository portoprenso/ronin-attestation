import React, { Component } from "react";
import ProductList from "../Products/ProductList/ProductList";
import BannerSlider from "./BannerSlider/BannerSlider";

class HomePage extends Component {
  render() {
    return (
      <>
        <BannerSlider />
        <ProductList />
      </>
    );
  }
}

export default HomePage;
