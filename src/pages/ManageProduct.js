import Axios from "axios";
import React, { Component } from "react";
import { Table, Button, Input } from "reactstrap";
import { api_url } from "../helpers/api_url";

class ManageProduct extends Component {
  state = {
    data: [],
    selectedData: null,
    inputData: {
      name: "",
      categoryID: 0,
      image: "",
      price: 0,
      stock: 0,
    },
    inputAdd: {
      name: "",
      categoryID: 0,
      image: "",
      price: 0,
      stock: 0,
    },
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    Axios.get(`${api_url}/products`)
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteData = (id) => {
    Axios.delete(`${api_url}/products/${id}`)
      .then((res) => {
        console.log("deleted", id);
        this.fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editData = (id) => {
    const data = this.state.data.find((val) => val.id === id);
    this.setState({
      selectedData: id,
      inputData: data,
    });
  };

  cancelEdit = () => {
    this.setState({
      selectedData: null,
    });
  };

  onChangeInput = (e) => {
    this.setState({
      inputData: {
        ...this.state.inputData,
        [e.target.id]: e.target.value,
      },
    });
  };

  onChangeInputAdd = (e) => {
    this.setState({
      inputAdd: {
        ...this.state.inputAdd,
        [e.target.id]: e.target.value,
      },
    });
  };

  addData = () => {
    const { inputAdd } = this.state;
    Axios.post(`${api_url}/products`, {
      ...inputAdd,
      categoryID: parseInt(inputAdd.categoryID),
      price: parseInt(inputAdd.price),
      stock: parseInt(inputAdd.stock),
    })
      .then((res) => {
        console.log("masuk");
        this.fetchData();
        this.setState({
          inputAdd: {
            name: "",
            categoryID: 0,
            image: "",
            price: 0,
            stock: 0,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  confirmEdit = (id) => {
    const { inputData } = this.state;
    Axios.patch(`${api_url}/products/${id}`, {
      ...inputData,
      categoryID: parseInt(inputData.categoryID),
      price: parseInt(inputData.price),
      stock: parseInt(inputData.stock),
    })
      .then((res) => {
        console.log("saved");
        this.setState({
          selectedData: null,
        });
        this.fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderList = () => {
    const { selectedData } = this.state;
    return this.state.data.map((val) => {
      if (selectedData === val.id) {
        return (
          <tr key={val.id}>
            <td>{val.id}</td>
            <td>
              <Input
                placeholder="Name"
                defaultValue={val.name}
                id="name"
                onChange={this.onChangeInput}
              />
            </td>
            <td>
              <Input
                placeholder="category id"
                defaultValue={val.categoryID}
                id="categoryID"
                onChange={this.onChangeInput}
              />
            </td>
            <td>
              <Input
                placeholder="image"
                defaultValue={val.image}
                id="image"
                onChange={this.onChangeInput}
              />
            </td>
            <td>
              <Input
                placeholder="price"
                defaultValue={val.price}
                type="number"
                id="price"
                onChange={this.onChangeInput}
              />
            </td>
            <td>
              <Input
                placeholder="stock"
                defaultValue={val.stock}
                id="stock"
                onChange={this.onChangeInput}
              />
            </td>
            <td>
              <Button onClick={this.cancelEdit}>Cancel</Button>
            </td>
            <td>
              <Button onClick={() => this.confirmEdit(val.id)}>Save</Button>
            </td>
          </tr>
        );
      }
      return (
        <tr key={val.id}>
          <td>{val.id}</td>
          <td>{val.name}</td>
          <td>{val.categoryID}</td>
          <td>
            <img width="50px" src={val.image} alt={val.name} />
          </td>
          <td>IDR {val.price.toLocaleString()}</td>
          <td>{val.stock}</td>
          <td>
            <Button
              color="success"
              style={{ width: "75%" }}
              onClick={() => this.editData(val.id)}
            >
              Edit
            </Button>
          </td>
          <td>
            <Button
              color="danger"
              style={{ width: "75%" }}
              onClick={() => this.deleteData(val.id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category ID</th>
              <th>Image</th>
              <th>Price</th>
              <th>Stock</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>{this.renderList()}</tbody>
          <tfoot>
            <tr>
              <td>#</td>
              <td>
                <Input
                  placeholder="name"
                  id="name"
                  onChange={this.onChangeInputAdd}
                />
              </td>
              <td>
                <Input
                  placeholder="category id"
                  id="categoryID"
                  onChange={this.onChangeInputAdd}
                />
              </td>
              <td>
                <Input
                  placeholder="image"
                  id="image"
                  onChange={this.onChangeInputAdd}
                />
              </td>
              <td>
                <Input
                  placeholder="price"
                  type="number"
                  id="price"
                  onChange={this.onChangeInputAdd}
                />
              </td>
              <td>
                <Input
                  placeholder="stock"
                  id="stock"
                  onChange={this.onChangeInputAdd}
                />
              </td>
              <td>
                <Button color="success" onClick={this.addData}>
                  Add
                </Button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }
}

export default ManageProduct;
