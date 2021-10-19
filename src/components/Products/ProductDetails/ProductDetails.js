import { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import './ProductDetails.scss'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LoaderSpinner from './../../LoaderSpinner/LoaderSpinner';

@inject("productsStore", "authStore")
@observer
class ProductDetails extends Component {

  async componentDidMount() {
    if(this.props.productsStore.categories.length < 1){
      this.props.productsStore.getCategories()
    }
      this.props.productsStore.getSpecifiedProduct(this.props.match.params.id);
      // console.log(this.props.productsStore.currentProduct)
  }

  render() {
    // console.log(this.props.productsStore.categories)
    // console.log(this.props.productsStore.currentProduct)

    const renderAch = () => <>{this.props.productsStore.currentProduct.achievements.map((ach,index) => <li key={`${ach}-${index}`}>•{ach}</li>)}</>
    const renderCats = () => this.props.productsStore.currentProduct?.categories.map((category, index) => <>
          {this.props.productsStore.categories.map((item, index) => {
            if(item.id === category){
              return <li key={`${item.id}${index}`} className="product-details__categories-item">{String.fromCharCode(62)}{item.title}</li>
            }
          })
        }
        </>
      )
    const expandReadMore = () => {
      let ref = document.getElementsByClassName("product-details__bottom-container__achievements__read-more")
      // console.log(ref.classList.toggle("achievement-collapse"))
      console.log(ref[0].classList.toggle("achievement-collapse"))
    }

    return (
      
      <div className="product-details">
        {/* {this.props.productsStore.currentProduct ?   */}
        {!this.props.productsStore.pending && this.props.productsStore.currentProduct ?
        <>
            <div className="product-details__bottom-container__card">
              {this.props.productsStore.currentProduct.main_image && <img alt="product" src={this.props.productsStore.currentProduct.main_image} />}
              <div className="product-details__bottom-container__card__info">
                <h2>${this.props.productsStore.currentProduct.price}<small>.99</small></h2>
                <div className="product-details__bottom-container__card__info__response">
                  <div>
                    <button>Добавить в корзину</button>
                    <button><FavoriteBorderIcon /></button>
                  </div>
                  <button>
                    Купить сейчас
                  </button>
                </div>
                <small >30-Day Money-Back Guarantee</small>
              </div>
            </div>

        <div className="product-details__top-container">
          <div className="product-details__top-container__inner">
            <ul className="product-details__categories">
              {this.props.productsStore.categories && this.props.productsStore.currentProduct?.categories && renderCats()}
            </ul>
            <div className="product-details__top-container__info">
              <h1>{this.props.productsStore.currentProduct.title}</h1>
              {/* <img src={this.props.productsStore.currentProduct.main_image}/> */}
              {/* {this.props.productsStore.currentProduct.achievements && renderAch() } */}
              <p>{this.props.productsStore.currentProduct.description}</p>
              {this.props.productsStore.currentProduct.certificate ? <h2 className="product-details__certificate">ⓘ Graduation certificate</h2> : <></>}
              {this.props.authStore.currentUser ? <h2 style={{cursor: 'pointer'}} onClick={() => this.props.history.push(`/editproduct/${this.props.match.params.id}`)} className="product-details__certificate">Edit product</h2> : <></>}
              {this.props.productsStore.currentProduct?.author && <h3 name={this.props.productsStore.currentProduct?.author?.uid}>{this.props.productsStore.currentProduct?.author?.displayName}</h3>}
            </div>
          </div>
        </div>
        <div className="product-details__bottom-container">
            <div className="product-details__bottom-container__achievements">
              <h2>What you will learn:</h2>
              {this.props.productsStore.currentProduct?.achievements && 
              <ul className="product-details__bottom-container__achievements__read-more achievement-collapse">
                {renderAch()}
              </ul>
              }
              <span onClick={(e) => expandReadMore(e)}>Read more </span>
            </div>
        </div>
        </> : <LoaderSpinner />
        }
      </div>
    );
  }
}

export default withRouter(ProductDetails);