import React, { Component } from 'react';
import { Orders } from '../api/orders.js';

class OrderHistory extends Component {
  constructor(props) {
    super(props);
  }

  getDate(date){
    let timeString = "";
    if(time.getHours() >= 10){
      timeString = time.getHours()+":";
    } else {
      timeString = "0"+time.getHours()+":";
    }

    if(time.getMinutes() >= 10){
      timeString = timeString + time.getMinutes();
    } else {
      timeString = timeString + "0"+time.getMinutes();
    }

    timeString = "Date:"+date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()+" Hour"+timeString;

    return timeString;
  }

  renderProducts(orderID){
    let products = Orders.find({id: orderID}).fetch();

    return products.map((product) => (
      <li>
        <div class="orderCard">
          <span className="products">
            <label>Product : </label>{product.name}
            <label>Price   : </label>{product.price}
          </span>
        </div>
      </li>
    ));
  }

  renderOrders() {
    let orderHistory = this.props.orders;
    return orderHistory.map((order) => (
      <li>
        <div class="orderCard">
          <span className="order">
            <label>Order ID: </label>{order._id}
            <label>Date    : </label>{this.getDate(order.date)}
            <ul>
              {this.renderProducts(order._id)}
            </ul>
          </span>
        </div>
      </li>
    ));
  }

  render() {
    return (
      <ul>
        {this.renderOrders()}
      </ul>
    );
  }
}

export default withTracker(() => {
  return {
    orders: Orders.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(OrderHistory);



