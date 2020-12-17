import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";

class HistoryModal extends Component {
  renderItemList = () => {
    const { modalData } = this.props;
    console.log(modalData);
    if (modalData) {
      return modalData.items.map((val, index) => {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{val.name}</td>
            <td>
              <img width="50px" src={val.image} alt="" />
            </td>
            <td>IDR {val.price.toLocaleString()}</td>
            <td>{val.qty}</td>
          </tr>
        );
      });
    }
  };
  render() {
    const { modalOpen, toggle } = this.props;
    return (
      <div>
        <Modal isOpen={modalOpen}>
          <ModalHeader>Modal title</ModalHeader>
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>{this.renderItemList()}</tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default HistoryModal;
