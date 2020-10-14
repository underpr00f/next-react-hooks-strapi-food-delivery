import Cookie from "js-cookie";
import axios from "axios";
import { API_URL } from "./constants";
import { toast } from "react-toastify";
import { ToastMessage } from "../components/general/ToastMessage";

export const userFetch = () => {
  const token = Cookie.get("token");
  return axios
    .get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      // if res comes back not valid, token is not valid
      // delete the token and log the user out on client
      if (res.statusText !== "OK") {
        Cookie.remove("token");
        Cookie.remove("cart");
        return null;
      }
      const user = res.data;
      console.log("", user);
      return user;
    })
    .catch((err) => {
      console.error(err);
      toast.error(ToastMessage(err.response.statusText));
      return null;
    });
};

export const userOrdersFetch = () => {
  const token = Cookie.get("token");
  return axios
    .get(`${API_URL}/users/me/orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      // if res comes back not valid, token is not valid
      // delete the token and log the user out on client
      if (res.statusText !== "OK") {
        Cookie.remove("token");
        Cookie.remove("cart");
        return null;
      }
      const user = res.data;
      console.log("USER ORDERS", user);
      return user;
    })
    .catch((err) => {
      console.error(err);
      toast.error(ToastMessage(err.response.statusText));
      return null;
    });
};
