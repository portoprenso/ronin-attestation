import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import './Profile.scss'
import { withRouter } from 'react-router-dom';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';
import { generateUUID } from '../helpers/functions';
import { FavoriteBorderIcon } from '@mui/icons-material/FavoriteBorder';

@inject("productsStore", "authStore")
@observer
class Profile extends Component {

  async componentDidMount(){
    this.props.productsStore.getUsersFavorites(this.props.authStore.currentUser.uid)
    this.props.productsStore.getProducts();
  }
  
  render() {
    console.log(this.props.history.location.pathname)
    let idRegex = /(?<=[/]profile[/]).+$/gi;
    let userId = this.props.history.location.pathname.match(idRegex)[0];

    const toggleFav = (e, id) => {
      if(!this.props.authStore.currentUser){
        this.props.history.push("/signin")
        return
      }
      this.props.productsStore.toggleFavorite(id, this.props.authStore.currentUser.uid)
      e.target.classList.toggle("product_card__btn__in-cart")
    }

    const checkProductInFav = (product) => {
      return product.favorites.includes(this.props.authStore?.currentUser?.uid)
    }


    return (
      <div className="profile">
        <div className="card">
          <img src={this.props.authStore.currentUser.photoURL} alt="John" style={{width:"100%"}} />
          <h2>{this.props.authStore.currentUser.displayName}</h2>
          <p className="title">{this.props.authStore.currentUser.email}</p>
          <p><button>Contact</button></p>
        </div>

        <div className="profile__favorites-container">
          <h2 style={{textAlign: 'center', padding: 10}}>Favorites</h2>
          <ul className="profile__favorites-container__list">
            
          {this.props.productsStore.usersFavorites && !this.props.productsStore.pending ? this.props.productsStore.products.map(product => {
          if(this.props.productsStore.usersFavorites.includes(product.id)) return <li key={generateUUID()} className="profile__favorites-container__list-item">
            <h5>{product.title}</h5>
            <img onClick={() => this.props.history.push(`/product/${product.id}`)} src={product.main_image}/>
            <button onClick={(e) => toggleFav(e, product.id)} className="">Remove from favorites</button>
            </li>})
            :
            <LoaderSpinner />}
          </ul>

        </div>
      </div>
    );
  }
}

export default withRouter(Profile);