import { inject } from 'mobx-react';
import React, { Component } from 'react';

@inject("productsStore")
class ProductCard extends Component {
  constructor(props){
    super();
  }
  render() {
    return (
      <>
        {this.props.product ? <div className="product_card__main" id={`${this.props.product.id}`}>
          <h5>{this.props.product.title}</h5>
          <img src={this.props.product.main_image} />
          <p>{this.props.product.description}</p>
          <button onClick={e => this.props.productsStore.deleteProduct(this.props.product.id)}>X</button>
        </div>
        :
        <div>NO PRODUCTS</div>}
      </>
    );
  }
}

export default ProductCard;