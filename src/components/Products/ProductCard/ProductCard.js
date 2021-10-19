import { inject } from 'mobx-react';
import React, { Component } from 'react';
import './ProductCard.scss';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { withRouter } from 'react-router-dom';

@inject("productsStore", "authStore")
class ProductCard extends Component {
  // constructor(props){
  //   super();
  // }

  // async componentDidUpdate(prevProps, prevState, snapshot){
  //   if(this.props.productsStore.cart)
  //   console.log(prevProps, prevState, snapshot)
  // }

  render() {

    const toggleFav = (e) => {
      if(!this.props.authStore.currentUser){
        this.props.history.push("/signin")
        return
      }
      this.props.productsStore.toggleFavorite(this.props.product.id, this.props.authStore.currentUser.uid)
      e.target.classList.toggle("product_card__btn__in-cart")
    }

    const checkProductInFav = () => {
      return this.props.product.favorites.includes(this.props.authStore?.currentUser?.uid)
    }

    return (
      <>
   
        {this.props.product ? 
        <div className="product_card" id={`${this.props.product.id}`}>
          <div className="img-container">
            <div className="img-inner">
              <div className="inner-skew">
                <img onClick={() => this.props.history.push(`/product/${this.props.product.id}`)} src={this.props.product.main_image} alt="product"/>
              </div>
            </div>
          </div>
          {/* <img onClick={() => this.props.history.push(`/product/${this.props.product.id}`)} src={this.props.product.main_image} className="product_card__image" alt="product"/> */}
          <div className="product_card__text-container">
          <h5 className="product_card__title">{this.props.product.title}</h5>
            <p className="product_card__desc">{this.props.product.description.slice(0, 50)}...</p>
            <div className="product_card__btn-container">
              <button onClick={() => this.props.productsStore.deleteProduct(this.props.product.id)} className="product_card__btn"><DeleteOutlineIcon/></button>
              <button onClick={(e) => this.props.productsStore.toggleProductInCart(e,this.props.product.id)} className={`product_card__btn ${this.props.productsStore.checkIfProductInCart(this.props.product.id) ? "product_card__btn__in-cart" : ""}`}><AddShoppingCartIcon style={{pointerEvents: "none"}}/></button>
              <button onClick={toggleFav} className={`product_card__btn ${checkProductInFav() ? "product_card__btn__in-cart" : ""}`}><FavoriteBorderIcon style={{pointerEvents: "none"}}/><small>{this.props.product.favorites.length}</small></button>
            </div>
          </div>
        </div>
        :
        <div>NO PRODUCTS</div>}
      </>
    );
  }
}

export default withRouter(ProductCard);