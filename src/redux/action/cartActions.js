import Axios from "axios";
import { api_url } from "../../helpers/api_url";
import swal from "sweetalert";

export const addToCartAction = (data) => {
  console.log(data);
  return (dispatch) => {
    Axios.get(`${api_url}/cart?userID=${data.userID}&name=${data.name}`)
      .then((res) => {
        if (res.data.length === 0) {
          Axios.post(`${api_url}/cart`, data)
            .then((res) => {
              console.log("data masuk");
              swal("Added to cart", "", "success");
              dispatch({
                type: "ADD_TO_CART",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          let item = res.data.find((val) => {
            return val.name === data.name;
          });
          Axios.patch(`${api_url}/cart/${item.id}`, {
            qty: item.qty + data.qty,
          })
            .then((res) => {
              console.log("berhasil patch");
              swal("Added to cart", "", "success");
              dispatch({
                type: "ADD_TO_CART",
              });
            })
            .catch((err) => {});
        }
        dispatch(getCartActionById(data.userID));
      })
      .catch((err) => {});
  };
};

export const getCartActionById = (id) => {
  return (dispatch) => {
    Axios.get(`${api_url}/cart?userID=${id}`)
      .then((res) => {
        console.log(id);
        console.log("data masuk");
        dispatch({
          type: "FETCH_CART",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteCartAction = (id, userID) => {
  return (dispatch) => {
    Axios.delete(`${api_url}/cart/${id}`)
      .then((res) => {
        swal("Deleted", "", "success");
        dispatch(getCartActionById(userID));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const checkOutAction = (data, idProductArr) => {
  return (dispatch) => {
    Axios.post(`${api_url}/transaction`, data)
      .then((res) => {
        console.log("data trsc msk");
        idProductArr.forEach((val, i) => {
          Axios.patch(`${api_url}/products/${val.id}`, {
            stock: val.stock - data.items[i].qty,
          })
            .then((res) => {
              console.log("berhasil patch qty");
            })
            .catch((err) => {
              console.log(err);
            });
        });
        data.items.forEach((val) => {
          Axios.delete(`${api_url}/cart/${val.id}`).then((res) => {
            console.log("delete id", val.id);
          });
        });
        dispatch({
          type: "RESET_STATE",
        });
        dispatch(getCartActionById(data.userID));
        swal("Transaction checkout", "Thank you!", "success");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const increaseQtyAction = (id, qty) => {
  return (dispatch) => {
    Axios.patch(`${api_url}/cart/${id}`, {
      qty: qty + 1,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const decreaseQtyAction = (id, qty) => {
  return (dispatch) => {
    Axios.patch(`${api_url}/cart/${id}`, {
      qty: qty - 1,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
