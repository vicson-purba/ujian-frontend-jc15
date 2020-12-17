import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Spinner, Table } from "reactstrap";
import {
  getCartActionById,
  deleteCartAction,
  checkOutAction,
  increaseQtyAction,
  decreaseQtyAction,
  fetchProductsAction,
} from "../redux/action";

class CartPage extends Component {
  state = {
    qtySelected: this.props.cart,
    redirectHome: false,
    stock: 0,
  };
  componentDidMount() {
    const { getCartActionById, user, fetchProductsAction } = this.props;
    getCartActionById(user.id);
    fetchProductsAction();
  }

  componentDidUpdate(prevProps) {
    const { user, getCartActionById } = this.props;
    if (prevProps.user.id !== user.id) {
      getCartActionById(user.id);
    }
    // if (prevProps.cart !== cart) {
    //   this.setState({
    //     stock: cart,
    //   });
    // }
  }

  increaseQty = (id, qty) => {
    const { user, increaseQtyAction, getCartActionById } = this.props;
    increaseQtyAction(id, qty);
    getCartActionById(user.id);
  };

  decreaseQty = (id, qty) => {
    const { user, decreaseQtyAction, getCartActionById } = this.props;
    decreaseQtyAction(id, qty);
    getCartActionById(user.id);
  };

  renderList = () => {
    const { products } = this.props;
    return this.props.cart.map((val) => {
      let product = products.find((value) => {
        return value.name === val.name;
      });
      return (
        <tr>
          <td>{val.id}</td>
          <td>{val.name}</td>
          <td>
            <img width="100px" src={val.image} alt="" />
          </td>
          <td>test</td>
          <td>
            <div className="d-flex align-items-center">
              <Button
                className="mr-2"
                size="sm"
                onClick={() => this.decreaseQty(val.id, val.qty)}
                disabled={val.qty === 1}
              >
                -
              </Button>
              <h5 className="mx-2 pt-2">{val.qty}</h5>
              <Button
                className="mx-2"
                size="sm"
                onClick={() => this.increaseQty(val.id, val.qty)}
                disabled={val.qty === product.stock ? true : false}
              >
                +
              </Button>
            </div>
          </td>
          <td>IDR {(val.qty * val.price).toLocaleString()}</td>
          <td>
            <Button color="danger" onClick={() => this.deleteCart(val.id)}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  renderGrandTotal = () => {
    const { cart } = this.props;
    let output = 0;
    cart.forEach((val) => {
      output += val.qty * val.price;
    });
    return output;
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

  deleteCart = (id) => {
    const { deleteCartAction, user } = this.props;
    deleteCartAction(id, user.id);
    getCartActionById(user.id);
  };

  checkOut = () => {
    const { user, checkOutAction, cart, products } = this.props;

    let idProductArr = cart.map((val) => {
      return products.find((value) => {
        return value.name === val.name;
      });
    });

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const checkOutData = {
      date: `${day}-${month}-${year}`,
      total: this.renderGrandTotal(),
      items: cart,
      userID: user.id,
    };
    checkOutAction(checkOutData, idProductArr);
    this.setState({
      redirectHome: true,
    });
  };

  render() {
    const { redirectHome } = this.state;
    const { cart, products } = this.props;
    if (redirectHome === true) {
      return <Redirect to="/" />;
    } else if (cart.length === 0) {
      return (
        <div>
          <div>Cart Empty</div>
        </div>
      );
    }
    return (
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Image</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length !== 0 ? (
            this.renderList()
          ) : (
            <div>
              <Spinner color="primary" />{" "}
            </div>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td />
            <td />
            <td />
            <td />
            <td>Grand Total</td>
            <td>IDR {this.renderGrandTotal().toLocaleString()}</td>
            <td>
              <Button color="success" onClick={this.checkOut}>
                Checkout
              </Button>
            </td>
          </tr>
        </tfoot>
      </Table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    user: state.user,
    products: state.products.productList,
  };
};

export default connect(mapStateToProps, {
  getCartActionById,
  deleteCartAction,
  checkOutAction,
  increaseQtyAction,
  decreaseQtyAction,
  fetchProductsAction,
})(CartPage);
