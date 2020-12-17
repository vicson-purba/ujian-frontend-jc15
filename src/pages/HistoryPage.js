import Axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { api_url } from "../helpers/api_url";
import { Table, Button } from "reactstrap";
import HistoryModal from "../components/HistoryModal";

class HistoryPage extends Component {
  state = {
    data: [],
    modalOpen: false,
    modalData: "",
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    // refresh bisa ambil data ketika masuk kedalam komponen ini
    const { userID } = this.props;
    if (prevProps.userID !== userID) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { userID } = this.props;
    Axios.get(`${api_url}/transaction?userID=${userID}`)
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderTable = () => {
    const { data } = this.state;
    return data.map((val, index) => {
      return (
        <tr key={index}>
          <td>{val.id}</td>
          <td>{val.date}</td>
          <td>IDR {val.total.toLocaleString()}</td>
          <td>
            <Button color="info" onClick={() => this.toggle(index)}>
              Shows Items
            </Button>
          </td>
        </tr>
      );
    });
  };

  toggle = (index) => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      modalData: index,
    });
  };

  render() {
    const { modalOpen, modalData, data } = this.state;
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Total</th>
              <th>Item</th>
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </Table>
        <HistoryModal
          modalOpen={modalOpen}
          toggle={this.toggle}
          modalData={data[modalData]}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    userID: user.id,
  };
};

export default connect(mapStateToProps)(HistoryPage);
