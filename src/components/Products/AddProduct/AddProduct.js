import { Chip, Divider, Stack } from '@mui/material';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { generateUUID } from '../../helpers/functions';
import ProductCard from '../ProductCard/ProductCard';
import './AddProduct.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import _ from "lodash"


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
      certificate: false,
      achievements: [],
      achievements_input: [],
      favorites: []
    };
  }

  async componentDidMount() {
    this.props.productsStore.getCategories();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log("UIHLKBJJHKGLJB<MNJHVBN")
  }

  render() {
    const handleClick = () => {
      console.info('You clicked the Chip.');
    };
  
    const handleDelete = (e) => {
      this.setState({achievements: this.state.achievements.filter(item => item !== e.target.parentNode.parentNode.getAttribute("name"))})
    };

    const handleAchievementInputSubmit = (e) => {
      if(e.key === 'Enter'){
        this.setState({achievements: [...this.state.achievements, this.state.achievements_input]});
        this.setState({achievements_input: ""})
      }
    };
  
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
        <h2>Add new course</h2>
        <label className="custom-field" aria-label="Title">
          <input type="text" value={this.state.title} placeholder="Title" onInput={e => this.setState({title: e.target.value})}/>
          <span className="placeholder">Title</span>
        </label>

        <label className="custom-field" aria-label="Price">
          <input type="number" value={this.state.price} placeholder="Price" onInput={e => this.setState({price: e.target.value})}/>
          <span className="placeholder">Price</span>
        </label>

        <label className="custom-field" aria-label="Description">
          <input type="text" value={this.state.description} placeholder="Description" onInput={e => this.setState({description: e.target.value})}/>
          <span className="placeholder">Description</span>
        </label>

        <label className="custom-field" aria-label="Main Image">
          <input type="text" value={this.state.main_image} placeholder="Main Image" onInput={e => this.setState({main_image: e.target.value})}/>
          <span className="placeholder">Main Image</span>
        </label>


          <div className="add-products__category-input" onClick={(e) => {
            e.stopPropagation()
            e.target.classList.toggle("active")
            }}>
            Categories
            <div className="add-products__category-input__menu">
              {this.props.productsStore.categories?.length > 0 && this.props.productsStore.categories.map(category => {
                return <div key={`${category.id}${Date.now()}`} style={{backgroundColor: this.state.categories.includes(category.id) ? "#2a9d8f" : "white"}} onClick={(e) => toggleCategory(e)} className="add-products__category-input__option" id={category.id}>{category.title}</div>
              })}
            </div>
          </div>
          <div className="add-products__category-input__achievements">
            <label className="custom-field" aria-label="Achievement">
              <input onKeyPress={(e) => handleAchievementInputSubmit(e)} type="text" value={this.state.achievements_input} placeholder="Achievement" onInput={e => this.setState({achievements_input: e.target.value})}/>
              <span className="placeholder">Achievement</span>
            </label>
            <Stack
            direction="row"
            style={{flexWrap: "wrap", maxWidth: 500}}
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
            >
              {this.state.achievements.map((ach, index) => {
                return <Chip
                    key={`${ach}${index}`}
                    label={ach}
                    onClick={handleClick}
                    onDelete={(e) => handleDelete(e)}
                    deleteIcon={<DeleteIcon />}
                    variant="outlined"
                    name={ach}
                  />
              })}
            </Stack>
          </div>
          <button onClick={e => console.log(this.state)}>Show in console</button>
          <button className="add-products__btn-add" onClick={() => this.props.productsStore.addProduct({
            ...this.state,
            id: generateUUID()
          })}>Add product</button>
        </div>
          <ProductCard product={this.state}/>
      </div>
    );
  }
}

export default AddProduct;