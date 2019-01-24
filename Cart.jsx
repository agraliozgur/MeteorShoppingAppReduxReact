import React, { Component } from 'react';

import { Chart } from '../api/chart.js';
import { Orders } from '../api/orders.js';


class Chart extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const price = ReactDOM.findDOMNode(this.refs.priceInput).value.trim();


    Orders.insert({
      text,
      price,
      createdAt: new Date(), 
      owner: Meteor.userId(),           
      username: Meteor.user().username,
    });
    removeFromChart("ALL");
  }

  removeFromChart(element) {
    if(element != "ALL")
      Chart.remove(element);
    else
      Chart.remove();
  }

  renderChart(){
    let chart = this.props.chart;

    return chart.map((product) =>(
      <li>
        <button className="delete" onClick={this.removeFromChart(product.productName)}>
          &times;
        </button>

        <span className="chart-product">
          <label>Name: </label>{product.productName}
          <label>Price: </label>{product.productPrice}
        </span>
      </li>
    ));

  }

  render() {
    return (
      <form className="new-order" onSubmit={this.handleSubmit.bind(this)}>
        <div class="chart">
          <ul>
           {this.renderChart()}
          </ul>
        </div>
        <button type="submit">Submit Order</button>
      </form>
    );
  }
}

export default withTracker(() => {
  return {
    chart: Chart.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(Chart);
