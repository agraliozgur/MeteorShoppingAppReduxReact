import React, { Component } from 'react';

import { Products } from '../api/products.js';

class ProductList extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const price = ReactDOM.findDOMNode(this.refs.priceInput).value.trim();


    Products.insert({
      text,
      price,
      createdAt: new Date(), 
      owner: Meteor.userId(),           
      username: Meteor.user().username,
    });
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
    ReactDOM.findDOMNode(this.refs.priceInput).value = '';
  }

  cardOnClick(user, event){
    
  }

  renderProducts() {
    let filteredProducts = this.props.products;
    return filteredProducts.map((product) => (
      <li>
        <div class="productCard" onClick={this.cardOnClick.bind(this, product)>
          <span className="text">
            <label>Name: </label>{product.name}
            <label>Price: </label>{product.price}
          </span>
        </div>
      </li>
    ));
  }
  

  render() {
    return (
      <form className="new-product" onSubmit={this.handleSubmit.bind(this)} >
              <label>Price:</label>
              <input
                type="text"
                ref="textInput"
                placeholder="enter product name"
              />
              <label>Price:</label>
              <input
                type="text"
                ref="priceInput"
                placeholder="enter price"
              />
            </form> : ''
      <ul>
        <h3>Product List</h3>
        {this.renderProducts()}
      </ul>
    );
  }
}

export default withTracker(() => {
  return {
    products: Products.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(ProductList);
