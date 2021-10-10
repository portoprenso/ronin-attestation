import { inject } from 'mobx-react';
import { Component } from 'react';
import './ProductCard.scss'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

@inject("productsStore")
class ProductCard extends Component {
  // constructor(props){
  //   super();
  // }
  render() {
    return (
      <>
        {this.props.product ? <div className="product_card" id={`${this.props.product.id}`}>
          <h5 className="product_card__title">{this.props.product.title}</h5>
          <img src={this.props.product.main_image} className="product_card__image" alt="product"/>
          <p className="product_card__desc">{this.props.product.description}</p>
          <div className="product_card__btn-container">
            <button onClick={e => this.props.productsStore.deleteProduct(this.props.product.id)} className="product_card__btn"><DeleteOutlineIcon/></button>
            <button className="product_card__btn"><AddShoppingCartIcon/></button>
            <button className="product_card__btn"><FavoriteBorderIcon/></button>
          </div>
        </div>
        :
        <div>NO PRODUCTS</div>}
      </>
    );
  }
}

export default ProductCard;