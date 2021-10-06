import React, { Component } from 'react';

class ProductCard extends Component {
  constructor(props){
    super();

  }
  render() {
    return (
      <>
        {this.props.product ? <div>SOME PRODUCT</div> : <div>NO PRODUCT</div>}
      </>
    );
  }
}

export default ProductCard;