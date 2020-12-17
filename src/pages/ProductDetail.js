import React, { Component } from "react";
import queryString from "querystring";
import { connect } from "react-redux";
import {
  fetchProductByIdAction,
  addToCartAction,
  getCartActionById,
} from "../redux/action";
import { Button } from "reactstrap";
import RadioButton from "../components/RadioButton";
import Slide from "react-reveal/Slide";

class ProductDetail extends Component {
  state = {
    data: {},
    qtySelected: 0,
    stockMinCart: 0,
  };

  componentDidMount() {
    const { fetchProductByIdAction } = this.props;
    const productID = queryString.parse(this.props.location.search)["?id"];
    fetchProductByIdAction(productID);
    console.log(productID);
  }

  componentDidUpdate(prevProps, prevState) {
    const { data, stockMinCart } = this.state;
    const { productById, cartList } = this.props;
    if (productById !== prevProps.productById) {
      this.setState({
        data: productById,
      });
    }

    if (prevState.data !== data || prevProps.cartList !== cartList) {
      const { data } = this.state;
      let result = cartList.find((val) => {
        return val.name === data.name;
      });
      if (result) {
        this.setState({
          stockMinCart: productById.stock - result.qty,
        });
      } else {
        this.setState({
          stockMinCart: productById.stock,
        });
      }
    }
    if (prevState.stockMinCart !== stockMinCart) {
      if (stockMinCart === 0) {
        this.setState({
          qtySelected: 0,
        });
      } else {
        this.setState({
          qtySelected: 1,
        });
      }
    }
  }

  getCartData = () => {
    const { cartList } = this.props;
    const { cartData, data } = this.state;
    let result = cartList.find((val) => {
      return val.name === data.name;
    });
    console.log(data);
    console.log(result);
    this.setState({
      cartData: result,
    });
    console.log(cartData);
  };

  increase = () => {
    this.setState({
      ...this.state,
      qtySelected: this.state.qtySelected + 1,
    });
  };
  decrease = () => {
    this.setState({
      ...this.state,
      qtySelected: this.state.qtySelected - 1,
    });
  };

  addToCart = () => {
    const { addToCartAction, user } = this.props;
    const { image, name, price } = this.props.productById;
    const dataCart = {
      name,
      price,
      userID: user.id,
      qty: this.state.qtySelected,
      image,
    };
    addToCartAction(dataCart);
  };

  render() {
    // console.log(this.props.location.search.split('=')[1])
    const { stockMinCart } = this.state;
    const { name, price, image } = this.props.productById;
    const { cartList } = this.props;
    let res = cartList.find((val) => {
      return val.name === name;
    });
    console.log(res);
    return (
      <div className="row m-3">
        <Slide left>
          <div className="col-6 d-flex justify-content-center">
            <img width="500" src={image} alt="" />
          </div>
        </Slide>
        <div className="col-6 pt-5">
          <div>
            <h3>{name}</h3>
            <h6>IDR {price ? price.toLocaleString() : null}</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              vero numquam magnam repudiandae nostrum minus asperiores tenetur,
              iusto illum ipsa deserunt, molestias illo sapiente consequatur
              impedit temporibus fugit alias aspernatur?
            </p>
          </div>
          <div className="pb-3">
            <RadioButton />
          </div>
          <div>
            <h6>How much do you want to buy.</h6>
            <p>Available stock: {stockMinCart}</p>
            <div className="d-flex align-items-center">
              <Button
                className="mr-2"
                size="sm"
                onClick={this.decrease}
                disabled={this.state.qtySelected === 0}
              >
                -
              </Button>
              <h5 className="mx-2 pt-2">{this.state.qtySelected}</h5>
              <Button
                className="mx-2"
                size="sm"
                onClick={this.increase}
                disabled={stockMinCart === this.state.qtySelected}
              >
                +
              </Button>
            </div>
          </div>
          <div className="py-3">
            <Button
              color="primary"
              onClick={this.addToCart}
              disabled={stockMinCart === 0}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productById: state.products.productById,
    user: state.user,
    cartList: state.cart.cart,
  };
};

export default connect(mapStateToProps, {
  fetchProductByIdAction,
  addToCartAction,
  getCartActionById,
})(ProductDetail);
