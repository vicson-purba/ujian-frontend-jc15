import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Badge,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAction } from "../redux/action";
import Cart from "../image/cart1.svg";

class NavigationBar extends Component {
  state = {
    isOpen: false,
    cartItem: 0,
  };

  componentDidMount() {
    this.setState({
      cartItem: this.props.cart.length,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cart.length !== this.props.cart.length) {
      this.setState({
        cartItem: this.props.cart.length,
      });
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  logOut = () => {
    localStorage.removeItem("id");
    this.props.logoutAction();
  };

  loginBtn = () => {
    // const { cart } = this.props;
    if (this.props.email === "") {
      return (
        <div>
          <Link to="/login">
            <Button
              outline
              color="info"
              size="sm"
              className="mx-2"
              style={{ border: "none" }}
            >
              Log in
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" color="info" style={{ border: "none" }}>
              Register
            </Button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="d-flex align-items-center">
          <div>
            <Link to="/cart">
              <img
                style={{
                  width: "30px",
                  marginRight: "5px",
                }}
                src={Cart}
                alt=""
              />
              <Badge color="danger">{this.state.cartItem}</Badge>
            </Link>
          </div>
          <div>
            <UncontrolledDropdown inNavbar>
              <DropdownToggle nav caret>
                {this.props.email}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Profile</DropdownItem>
                <Link
                  to="/history-transaction"
                  style={{ textDecoration: "none" }}
                >
                  <DropdownItem>History Transaction</DropdownItem>
                </Link>
                <Link to="./manage-product" style={{ textDecoration: "none" }}>
                  <DropdownItem>Manage Products</DropdownItem>
                </Link>
                <DropdownItem onClick={this.logOut}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <Navbar
          className="navbar"
          style={{ backgroundColor: "#333333", color: "#D6D6D6" }}
          light
          expand="md"
        >
          <NavbarBrand
            className="ml-3"
            style={{ color: "#D6D6D6", display: "flex", alignItems: "center" }}
            href="/"
          >
            Toko Sepatu
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link
                  to="/products"
                  style={{ textDecoration: "none", color: "#D6D6D6" }}
                >
                </Link>
              </NavItem>
            </Nav>
            <div className="mr-3">{this.loginBtn()}</div>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = ({ user, cart }) => {
  return {
    email: user.email,
    cart: cart.cart,
  };
};

export default connect(mapStateToProps, { logoutAction })(NavigationBar);
