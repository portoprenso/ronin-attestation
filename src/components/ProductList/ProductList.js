import React, {Component} from 'react';
import ProductCard from '../ProductCard/ProductCard';
import {getProducts} from "../helpers/functions";

class ProductList extends Component {
    constructor() {
        super();
        this.state = {
            productsData: []
        }
    }
    componentDidMount() {
        getProducts().then(data => this.setState({productsData: data}))
    }

    render() {
        return (
            <div>
                <h2>KJHDKJHS</h2>
                {this.state.productsData.length > 0 ? this.state.productsData.map(product => <ProductCard product={product}/>) : <h2>There are no products</h2>}
            </div>
        );
    }
}

export default ProductList;