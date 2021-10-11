import { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';

@inject("productsStore")
@observer
class ProductDetails extends Component {

  async componentDidMount() {
    if(this.props.productsStore.products.length < 1){
      this.props.productsStore.getSpecifiedProduct(this.props.match.params.id);
      console.log(this.props.productsStore.currentProduct)
    } else {
      this.props.productsStore.currentProduct = this.props.productsStore.products.find(item => item.id === this.props.match.params.id)
      console.log(this.props.productsStore.currentProduct)
    }
  }

  render() {
    console.log(this.props.history)
    console.log(this.props.match.params.id)
    return (
      <div className="product-details">
        <div className="product-details__top-container">

        </div>
        <div className="product-details__bottom-container">
          
        </div>
      </div>
    );
  }
}

export default withRouter(ProductDetails);