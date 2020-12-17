import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import {
  Landing,
  LoginPage,
  RegisterPage,
  ProductPage,
  ProductDetail,
  CartPage,
  HistoryPage,
  ManageProduct,
} from "./pages";
import { NavigationBar } from "./components";
import {
  keepLogin,
  getCartActionById,
  // fetchProductsAction,
} from "./redux/action";

class App extends Component {
  state = {};
  componentDidMount() {
    const id = localStorage.getItem("id");
    if (id) {
      this.props.keepLogin(id);
      this.props.getCartActionById(id);
      // this.props.fetchProductsAction();
    }
  }
  render() {
    return (
      <div>
        <NavigationBar />
        <Route path="/" exact component={Landing} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/products" component={ProductPage} />
        <Route path="/product-detail" component={ProductDetail} />
        <Route path="/cart" component={CartPage} />
        <Route path="/history-transaction" component={HistoryPage} />
        <Route path="/manage-product" component={ManageProduct} />
      </div>
    );
  }
}

export default connect(null, {
  keepLogin,
  getCartActionById,
  // fetchProductsAction,
})(App);
