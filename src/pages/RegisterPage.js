import Axios from "axios";
import React, { Component } from "react";
import { Input, Button } from "reactstrap";
import { api_url } from "../helpers/api_url";
import { connect } from "react-redux";
import { loginAction } from "../redux/action";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class RegisterPage extends Component {
  state = {
    registerInfo: {
      email: "",
      password: "",
      confirm: "",
    },
  };

  // Register = tambah data ke dalam database (db.json)
  // tambah data menggunakan Axios.post(url, data)
  // ketika data berhasil masuk ke dalam database
  // data yang baru saja dimasukkan ke dalam database masuk juga ke redux ke global state
  // Login otomatis setelah register

  onChangeInput = (e) => {
    this.setState({
      registerInfo: {
        ...this.state.registerInfo,
        [e.target.id]: e.target.value,
      },
    });
    console.log(this.state.registerInfo);
  };

  clickRegister = () => {
    // this.props.loginAction(res.data[0])
    // eslint-disable-next-line no-useless-escape
    var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const { email, password, confirm } = this.state.registerInfo;
    if (email.match(EMAIL_REGEX)) {
      if (email === "" || password === "" || confirm === "") {
        alert("Please fill all the forms!");
      } else {
        Axios.get(`${api_url}/users?email=${email}`)
          .then((res) => {
            console.log(res.data[0]);
            if (res.data.length !== 0) {
              alert("Email already registered");
            } else if (password !== confirm) {
              alert("Password does not match!");
            } else {
              if (password.match(PASSWORD_REGEX)) {
                Axios.post(`${api_url}/users`, {
                  email,
                  password,
                })
                  .then((res) => {
                    console.log(res.data);
                    this.props.loginAction(res.data);
                    localStorage.setItem("id", res.data.id);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                alert("Password must contain");
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      alert("Wrong email");
    }
  };

  render() {
    if (this.props.emailUser !== "") {
      return <Redirect to="/" />;
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <div>
          <h3 className="my-1">Register Now</h3>
          <h6>Fill in the form below to get instant access</h6>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            Height: "50vh",
          }}
        >
          <div className="my-2">
            {/* Email */}
            <Input
              size="40"
              placeholder="Email"
              type="email"
              id="email"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="my-2">
            {/* Password */}
            <Input
              size="40"
              placeholder="Password"
              type="password"
              id="password"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="my-2">
            {/* Confrim Password */}
            <Input
              size="40"
              placeholder="Confirm Password"
              type="password"
              id="confirm"
              onChange={this.onChangeInput}
            />
          </div>
          <Button
            style={{
              width: "340px",
              backgroundColor: "#333333",
              border: "none",
              color: "#D6D6D6",
            }}
            className="my-2"
            color="primary"
            onClick={this.clickRegister}
          >
            Register
          </Button>
          <h6 style={{ paddingTop: "30px" }}>Have an account?</h6>
          <Link to="/login">
            <Button outline color="dark">
              Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.user.id,
    emailUser: state.user.email,
  };
};

export default connect(mapStateToProps, { loginAction })(RegisterPage);
