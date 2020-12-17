import React, { Component } from "react";
import { fetchProductsAction } from "../redux/action";
import { connect } from "react-redux";
import ProductPage from "../pages/ProductPage";

class Landing extends Component {
  state = {};
  componentDidMount() {
    fetchProductsAction();
  }
  

  render() {
    return (
      <div>
        <ProductPage/>
      </div>
    );
  }
}

export default connect(null, fetchProductsAction)(Landing);
