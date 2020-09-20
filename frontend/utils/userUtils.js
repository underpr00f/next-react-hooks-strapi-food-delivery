import Cookie from "js-cookie";
import axios from "axios";
import { API_URL } from './constants'

export const userFetch = () => {
    const token = Cookie.get("token");
    return axios
      .get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (res.statusText!=="OK") {
          Cookie.remove("token");
          Cookie.remove("cart");
          return null;
        }
        const user = res.data;
        return user;
      })
      .catch((err) => {
        console.error(err)
        return null;
      });
  }