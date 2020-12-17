import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchCategoriesAction,
  fetchProductsAction,
  fetchByCategoryAction,
} from "../redux/action";
import { ProductCard } from "../components";
import { Link } from "react-router-dom";

class ProductPage extends Component {
  state = {
    selectedCategory: "",
  };
  componentDidMount() {
    const { fetchCategoriesAction, fetchProductsAction } = this.props;
    fetchCategoriesAction();
    fetchProductsAction();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedCategory !== prevState.selectedCategory) {
      const { fetchByCategoryAction } = this.props;
      fetchByCategoryAction(this.state.selectedCategory);
    }
  }

  

  renderProductList = () => {
    return this.props.productList.map((val, index) => {
      return (
        <div className="mx-2 mb-4" key={index}>
          <Link
            to={`/product-detail?id=${val.id}`}
            style={{ textDecoration: "none" }}
          >
            <ProductCard image={val.image} name={val.name} price={val.price} stock={val.stock} />
          </Link>
        </div>
      );
    });
  };

  onChangeCategory = (e) => {
    console.log(e);
    this.setState({
      selectedCategory: e.id,
    });
    console.log(this.state.selectedCategory);
  };

  render() {
    return (
      <div className="row my-3" >
        <div className="col-3 mx-auto" style={{ display: "flex", flexWrap: "wrap",  }}>
          {this.renderProductList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.products.categories,
    productList: state.products.productList,
    categoryList: state.products.productByCategory,
  };
};

export default connect(mapStateToProps, {
  fetchCategoriesAction,
  fetchProductsAction,
  fetchByCategoryAction,
})(ProductPage);
