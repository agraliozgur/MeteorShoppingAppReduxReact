import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Products } from '../api/products.js';
import { UserChart } from '../api/chart.js';
import { Orders } from '../api/orders.js';

import Chart from './Chart.jsx';
import OrderHistory from './OrderHistory.jsx';
import ProductList from './ProductList.jsx';

import AccountsUIWrapper from './AccountsUIWrapper.js';
import {Provider} from 'react-redux'
import Store from '../redux/store/store'
import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { push,routerForBrowser, initializeCurrentLocation,initialState, Fragment, RoutedfdfdsfsdfProvider, Link } from 'redux-little-router';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const App = () => (
  <Provider store={Store}>
    <div className="container">
      <header>
        <h1>Todo List</h1>
          <AccountsUIWrapper />
      </header>

      <ul>
        { this.props.currentUser ?
          <div class="container">
           <div class="productList">
            <ProductList />
           </div>
           <div class="chart">
              <Chart />
              </div>
            <div class="orders">
              <OrderHistory />
            </div>
          </div>: ''
        }
      </ul>
    </div>
  </Provider>
);


export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(App);
