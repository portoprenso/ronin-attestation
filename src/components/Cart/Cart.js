import { inject, observer } from "mobx-react";
import { Component } from "react";
import "./Cart.scss";
import { withRouter } from 'react-router-dom';

@inject("productsStore", "authStore")
@observer
class Cart extends Component {
  async componentDidMount() {
    if (this.props.productsStore.products.length < 1) {
      await this.props.productsStore.getProducts();
    }
    if (!this.props.productsStore.cart) {
      this.props.productsStore.getCart();
    }
  }

  
  render() {
    const calcItems = () => {
      let sum = 0;
      for(let i = 0; i < this.props.productsStore.cart.length; i++){
        sum += this.props.productsStore.cart[i].count
      }
      return sum
  
    }

    const toggleFav = (e, id) => {
      if(!this.props.authStore.currentUser){
        this.props.history.push("/signin")
        return
      }
      this.props.productsStore.toggleFavorite(id, this.props.authStore.currentUser.uid)
      e.target.classList.toggle("product_card__btn__in-cart")
    }

    return (
      <div className="cart">
        <div className="cart-container">
          <div class="cart-container__header">
            <h3 class="cart-container__header__heading">Shopping Cart</h3>
            <h5 onClick={this.props.productsStore.emptyCart} class="cart-container__header__action">Remove all</h5>
          </div>
          {this.props.productsStore.cart?.length > 0 && this.props.productsStore.products?.length > 0 && this.props.productsStore.cart.map(item => {
            let product = this.props.productsStore.products.find(product => product.id === item.id)
          return <div class="cart-container__cart-item">
            <div class="cart-container__cart-item__image-box">
              <img
                src={product?.main_image}
                style={{ height: 120 }}
              />
            </div>
            <div class="cart-container__cart-item__about">
              <h1 class="cart-container__cart-item__title">{product?.title}</h1>
              {/* <img
                src={product?.main_image}
                style={{ height: 30 }}
              /> */}
            </div>
            <div class="cart-container__cart-item__counter">
              <div onClick={() => this.props.productsStore.changeProductCountInCart(item.id, "+")} class="btn">+</div>
              <div class="count">{item.count}</div>
              <div onClick={() => this.props.productsStore.changeProductCountInCart(item.id, "-")} class="btn">-</div>
            </div>
            <div class="cart-container__cart-item__prices">
              <div class="amount">${product.price}</div>
              <div class="save">
                <u onClick={(e) => toggleFav(e, item.id)}>Save for later</u>
              </div>
              <div onClick={() => this.props.productsStore.toggleProductInCart(null, item.id)} class="remove">
                <u >Remove</u>
              </div>
            </div>
          </div>

          })}
          {this.props.productsStore.cart?.length > 0 && this.props.productsStore.products?.length > 0 && <>
          <hr />
          <div class="checkout">
            <div class="total">
              <div>
                <div class="subtotal">Sub-Total</div>
                <div class="items">{calcItems()} items</div>
              </div>
              <div class="total-amount">${this.props.productsStore.calcSubTotalCart()}</div>
            </div>
            <button class="button">Checkout</button>
          </div>
          </>
          }

        </div>
      </div>
    );
  }
}

export default withRouter(Cart);
