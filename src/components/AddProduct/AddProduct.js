import React, { Component } from 'react';

class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      addProductTitle: "",
      addProductDesc: "",
      addProductMainImage: "",
      addProductCategories: [],
      addProductPrice: 0
    };
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("UIHLKBJJHKGLJB<MNJHVBN")
  }
  

  render() {
    return (
      <div>
        <input type="text" value={this.state.addProductTitle} placeholder="Title" onChange={e => this.setState({addProductTitle: e.target.value})}/>
        <input type="number" value={this.state.addProductPrice} placeholder="Price" onChange={e => this.setState({addProductPrice: e.target.value})}/>
        <input type="text" value={this.state.addProductDesc} placeholder="Description" onChange={e => this.setState({addProductDesc: e.target.value})}/>
        <input type="text" value={this.state.addProductMainImage} placeholder="Main Image" onChange={e => this.setState({addProductMainImage: e.target.value})}/>
        <input type="text" value={this.state.addProductCategories} placeholder="Categories" onChange={e => this.setState({addProductCategories: e.target.value})}/>
        <button onClick={e => console.log(this.state)}>Show in console</button>
      </div>
    );
  }
}

export default AddProduct;