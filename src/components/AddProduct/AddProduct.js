import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { generateUUID } from '../helpers/functions';
import './AddProduct.scss'

@inject("productsStore")
@observer
class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      addProductTitle: "",
      addProductDesc: "",
      addProductMainImage: "",
      addProductCategories: [],
      addProductPrice: 0,
    };
  }
  async componentDidMount() {
    this.props.productsStore.getCategories();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("UIHLKBJJHKGLJB<MNJHVBN")
  }

  render() {
    const toggleCategory = (event) => {
      if(this.state.addProductCategories.includes(Number(event.target.id))){
        this.state.addProductCategories = this.state.addProductCategories.filter((item, index) => {
          return item !== Number(event.target.id)
        })
        this.setState(this.state.addProductCategories)
      } else {
        this.state.addProductCategories.push(Number(event.target.id))
        this.setState(this.state.addProductCategories)
      }
      console.log(this.state)
    }
    return (
      <div className="add-products">
        <div className="add-products__container">
          <input type="text" value={this.state.addProductTitle} placeholder="Title" onChange={e => this.setState({addProductTitle: e.target.value})}/>
          <input type="number" value={this.state.addProductPrice} placeholder="Price" onChange={e => this.setState({addProductPrice: e.target.value})}/>
          <input type="text" value={this.state.addProductDesc} placeholder="Description" onChange={e => this.setState({addProductDesc: e.target.value})}/>
          <input type="text" value={this.state.addProductMainImage} placeholder="Main Image" onChange={e => this.setState({addProductMainImage: e.target.value})}/>

          <div className="add-products__category-input">
            Categories
            {this.props.productsStore.categories?.length > 0 && this.props.productsStore.categories.map(category => {
              return <div style={{backgroundColor: this.state.addProductCategories.includes(category.id) ? "#2a9d8f" : "#d8e2dc"}} onClick={(e) => toggleCategory(e)} className="add-products__category-input__option" id={category.id}>{category.title}</div>
              // return <div style={{color: this.state.addProductCategories.includes(category.id) ? "red" : "blue"}} onClick={(e) => toggleCategory(e)} className="add-products__category-input__option" id={category.id}>{category.title}</div>
            })}
          </div>
          <button onClick={e => console.log(this.state)}>Show in console</button>
          <button onClick={() => this.props.productsStore.addProduct({
            category: this.state.addProductCategories,
            title: this.state.addProductTitle,
            main_image: this.state.addProductMainImage,
            price: this.state.addProductPrice,
            description: this.state.addProductDesc,
            id: generateUUID()
          })}>Add product</button>
        </div>
      </div>
    );
  }
}

export default AddProduct;