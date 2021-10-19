import React, { Component } from "react";
import "./BannerSlider.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Parallax } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import { inject, observer } from "mobx-react";
import { Link } from 'react-router-dom'
// import { toJS } from "mobx";

SwiperCore.use([Navigation, Pagination, Parallax]);

@inject("productsStore")
@observer
class BannerSlider extends Component {
  async componentDidMount() {
    this.props.productsStore.getCategories();
  }

  render() {
    const eachSlide = (product) => {
      // console.log(toJS(product))
      return (
        <>
          {product.categories && product?.categories.map((eachCategory) => {
            return (
              <li className="banner-slider-main" key={Date.now() + Math.floor(Math.random()*100)}>
                {this.props.productsStore.categories.map((item) => {
                  if (item.id === eachCategory) {
                    return <span>{item.title}</span>;
                  } else return;
                })}
              </li>
            );
          })}
        </>
      );
    };

    return (
      <div className="banner-slide__outer-container">
        <Swiper
          // spaceBetween={50}
          slidesPerView={2}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          navigation
          // pagination
          loop
          // autoplay
          // parallax={true}
          speed={500}
          centeredSlides={true}
        >
          {this.props.productsStore.products &&
            this.props.productsStore.products.slice(0,3).map((product) => {
              return (
                <SwiperSlide>
                  <div className="banner-slide">
                    <img src={product.main_image} />
                    <ul className="banner-slide__categories">
                      {eachSlide(product)}
                      <li><Link to={`/product/${product.id}`}>Learn more</Link></li>
                    </ul>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    );
  }
}

export default BannerSlider;
