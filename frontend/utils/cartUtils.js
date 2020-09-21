import Cookie from "js-cookie";
import axios from "axios";
import { API_URL } from './constants'

// function arraysEqual(a1,a2) {
  /* WARNING: arrays must not contain {objects} or behavior may be undefined */
  // Object.keys(item).forEach(function(key) {
  //   if (item[key] == null || item[key] == 0) {
  //     item[key] = results[key];
  //   }
  // })
//   return JSON.stringify(a1)==JSON.stringify(a2);
// }
// function sortByKey(array, key) {
//   return array.sort(function(a, b) {
//       var x = a[key]; var y = b[key];
//       return ((x < y) ? -1 : ((x > y) ? 1 : 0));
//   });
// }

const correctingPrice = (arrayDishes, arrayElements) => {
  
  if (Array.isArray(arrayElements) && arrayElements.length) {
    //check if price is differ
    arrayDishes.forEach(function(entry) {
      if (arrayElements.find(v => v.id === entry.id)) {
        arrayElements.find(v => v.id === entry.id).price = entry.price;
        arrayElements.find(v => v.id === entry.id).name = entry.name;
      }
    });
    
    //if items in cart, set items and total from cookie
    let sumTotal = 0;
    arrayElements.forEach((item) => {
      sumTotal += item.price * item.quantity
    });
    return { 
      items: arrayElements, 
      total: sumTotal
    }
  }
  return { 
    items: [], 
    total: 0
  }
}

export const manageCart = (cart_id, cart_items) => {
  const token = Cookie.get("token");
  if (token) {
    const cart_items_ids = cart_items.map(choice => (choice.id))
    return axios
    .put(
      `${API_URL}/carts/${cart_id}`, 
      JSON.stringify({
          "elements": cart_items,
          "dishes": cart_items_ids
        }),
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
    .then((res) => {
      // if res comes back not valid, token is not valid
      // delete the token and log the user out on client
      if (res.statusText!=="OK") {
        console.log("Response bad, check how you manage cart")
        return null;
      }
      const { dishes } = res.data;
      const arrayElements = cart_items;
      const correctCart = correctingPrice(dishes, arrayElements)
      return correctCart
    })
    .catch((err) => console.error(err));
  }
  return null
}
export const manageCookieCart = (cart_id, cart_items) => {
  if (cart_items) {
    // const cart_items_ids = cart_items.map(choice => (choice.id))
    return axios
    .get(
      `${API_URL}/dishes/${cart_id}`, 
      {
        headers: { 
          "Content-Type": "application/json"
        }
      }
    )
    .then((res) => {
      // if res comes back not valid, token is not valid
      // delete the token and log the user out on client
      if (res.statusText!=="OK") {
        console.log("Response bad, check how you manage cart")
        return null;
      }
      const { data } = res;
      const dish = {
        id: data.id,
        price: data.price,
        name: data.name
      }
      let dishes = [];
      dishes.push(dish);
      const arrayElements = cart_items;
      const correctCart = correctingPrice(dishes, arrayElements)
      // console.log(correctCart);
      return correctCart
    })
    .catch((err) => console.error(err));
  }
  return null
}
export const setCartUtil = (cart_id) => {
  const token = Cookie.get("token");
  return axios
    .get(`${API_URL}/carts/${cart_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // if res comes back not valid, token is not valid
      // delete the token and log the user out on client
      if (res.statusText!=="OK") {
        return null;
      }
      const userCart = res.data;

      //correcting price in cookie and elements
      const arrayDishes = userCart.dishes
      let arrayElements = userCart.elements
  
      if (Array.isArray(arrayElements) && arrayElements.length) {
        //check if price is differ
        arrayDishes.forEach(function(entry) {
          arrayElements.find(v => v.id === entry.id).price = entry.price;
        });
        //if items in cart, set items and total from cookie
        let sumTotal = 0;
        arrayElements.forEach((item) => {
          sumTotal += item.price * item.quantity
        });
        return { 
          items: arrayElements, 
          total: sumTotal
        }
      }
      Cookie.set("cart", arrayElements)
      return { 
        items: [], 
        total: 0
      }
    })
    .catch((err) => {
      console.error(err)
    });
}

export const checkItemAndTotalCart = () => {
  const cart = Cookie.get("cart");
  // if items in cart, set items and total from cookie
  if (typeof cart === "string" && cart !== "undefined") {
    let sumTotal = 0;
    JSON.parse(cart).forEach((item) => {
      sumTotal += item.price * item.quantity
    });
    return { 
      items: JSON.parse(cart), 
      total: sumTotal 
    }
  }
  return {
    items: [],
    total: 0
  }
}