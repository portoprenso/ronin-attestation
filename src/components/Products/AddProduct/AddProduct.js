import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { generateUUID } from '../../helpers/functions';
import ProductCard from '../ProductCard/ProductCard';
import './AddProduct.scss'

@inject("productsStore")
@observer
class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      main_image: "",
      categories: [],
      price: 0,
    };
  }
  async componentDidMount() {
    this.props.productsStore.getCategories();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log("UIHLKBJJHKGLJB<MNJHVBN")
  }

  render() {
    const toggleCategory = (event) => {
      if(this.state.categories.includes(Number(event.target.id))){
        this.setState({categories: this.state.categories.filter(item => item !== Number(event.target.id))})
      } else {
        this.state.categories.push(Number(event.target.id))
        this.setState({categories: this.state.categories})
      }
      console.log(this.state)
    }
    return (
      <div className="add-products">
        <div className="add-products__container">
          <input type="text" value={this.state.title} placeholder="Title" onChange={e => this.setState({title: e.target.value})}/>
          <input type="number" value={this.state.price} placeholder="Price" onChange={e => this.setState({price: e.target.value})}/>
          <input type="text" value={this.state.description} placeholder="Description" onChange={e => this.setState({description: e.target.value})}/>
          <input type="text" value={this.state.main_image} placeholder="Main Image" onChange={e => this.setState({main_image: e.target.value})}/>

          <div className="add-products__category-input" onClick={(e) => {
            e.stopPropagation()
            e.target.classList.toggle("active")
            }}>
            Categories
            <div className="add-products__category-input__menu">
              {this.props.productsStore.categories?.length > 0 && this.props.productsStore.categories.map(category => {
                return <div style={{backgroundColor: this.state.categories.includes(category.id) ? "#2a9d8f" : "#d8e2dc"}} onClick={(e) => toggleCategory(e)} className="add-products__category-input__option" id={category.id}>{category.title}</div>
              })}
            </div>
          </div>
          <button onClick={e => console.log(this.state)}>Show in console</button>
          <button onClick={() => this.props.productsStore.addProduct({
            category: this.state.categories,
            title: this.state.title,
            main_image: this.state.main_image,
            price: this.state.price,
            description: this.state.description,
            id: generateUUID()
          })}>Add product</button>
        </div>

          <ProductCard product={this.state}/>

      </div>
    );
  }
}

export default AddProduct;