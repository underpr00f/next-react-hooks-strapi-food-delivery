import axios from 'axios';
import { API_URL } from './constants';
export const manageDonate = async (token, values) => {
  if (token && values) {
    try {
      const res = await axios.post(
        `${API_URL}/donates`,
        JSON.stringify(values),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (res.statusText !== 'OK') {
        console.log('Response bad, check how you manage cart');
        return null;
      }
      const response = await res.data;
      return response;
    } catch (err) {
      console.error(err);
    }
  }
  return null;
};

export const getLastDonate = async (token) => {
  // const token = Cookie.get('token');
  if (token) {
    try {
      const res = await axios.get(`${API_URL}/donates/last`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (res.statusText !== 'OK') {
        console.log('Response bad, check how you manage cart');
        return null;
      }
      const response = await res.data;
      return response;
    } catch (err) {
      console.error(err);
    }
  }
  return null;
};
// const correctingPrice = (arrayDishes, arrayElements) => {
//   if (Array.isArray(arrayElements) && arrayElements.length) {
//     //check if price is differ
//     arrayDishes.forEach(function (entry) {
//       if (arrayElements.find((v) => v.id === entry.id)) {
//         arrayElements.find((v) => v.id === entry.id).price = entry.price;
//         arrayElements.find((v) => v.id === entry.id).name = entry.name;
//       }
//     });

//     //if items in cart, set items and total from cookie
//     let sumTotal = 0;
//     arrayElements.forEach((item) => {
//       sumTotal += item.price * item.quantity;
//     });
//     return {
//       items: arrayElements,
//       total: sumTotal
//     };
//   }
//   return {
//     items: [],
//     total: 0
//   };
// };
// const getCartObject = (correctCart, orderId) => {
//   return {
//     items: correctCart.items,
//     total: correctCart.total,
//     orderId: orderId || null
//   };
// };

// export const manageCart = (cart_id, cart_items, user_id) => {
//   const token = Cookie.get("token");
//   if (token) {
//     console.log("cart_items", cart_items);
//     const cart_items_ids = cart_items.map((choice) => choice.id);
//     return axios
//       .put(
//         `${API_URL}/carts/${cart_id}`,
//         JSON.stringify({
//           elements: cart_items,
//           dishes: cart_items_ids,
//           user: user_id
//         }),
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json"
//           }
//         }
//       )
//       .then((res) => {
//         // if res comes back not valid, token is not valid
//         // delete the token and log the user out on client
//         if (res.statusText !== "OK") {
//           console.log("Response bad, check how you manage cart");
//           return null;
//         }
//         const { dishes, order } = res.data;
//         console.log(res.data);

//         const correctCart = correctingPrice(dishes, cart_items);
//         const getCart = getCartObject(correctCart, order && order.id);
//         return getCart;
//       })
//       .catch((err) => console.error(err));
//   }
//   return null;
// };
// export const checkoutCart = (order_id, cart_id, user_id, data) => {
//   const token = Cookie.get("token");
//   const { address, city, state } = data;
//   if (token) {
//     //ЗДЕСЬ Я ДОЛЖЕН СДЕЛАТЬ ПОМЕТКУ ОПЛАЧЕНО
//     //В КОНТРОЛЛЕРЕ АПДЕЙТА СТРАПИ ОЧИСТИТЬ КОРЗИНУ И ПЕРЕЙТИ В НОВЫЙ ОРДЕР
//     // IF PAYED
//     return axios
//       .put(
//         `${API_URL}/orders/${order_id}`,
//         JSON.stringify({
//           cart_id: cart_id,
//           order_id: order_id,
//           // dishes: cart_items_ids,
//           address,
//           city,
//           state,
//           user: user_id,
//           payed: true
//         }),
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json"
//           }
//         }
//       )
//       .then((res) => {
//         // if res comes back not valid, token is not valid
//         // delete the token and log the user out on client
//         if (res.statusText !== "OK") {
//           console.log("Response bad, check how you manage cart");
//           return null;
//         }
//         console.log(res);

//         return true;
//       })
//       .catch((err) => console.error(err));
//   }
//   return null;
// };
// export const manageCookieCart = (cart_id, cart_items) => {
//   if (cart_items) {
//     // const cart_items_ids = cart_items.map(choice => (choice.id))
//     return axios
//       .get(`${API_URL}/dishes/${cart_id}`, {
//         headers: {
//           "Content-Type": "application/json"
//         }
//       })
//       .then((res) => {
//         // if res comes back not valid, token is not valid
//         // delete the token and log the user out on client
//         if (res.statusText !== "OK") {
//           console.log("Response bad, check how you manage cart");
//           return null;
//         }
//         const { data } = res;
//         const dish = {
//           id: data.id,
//           price: data.price,
//           name: data.name
//         };
//         let dishes = [];
//         dishes.push(dish);
//         const arrayElements = cart_items;
//         const correctCart = correctingPrice(dishes, arrayElements);
//         // console.log(correctCart);
//         return correctCart;
//       })
//       .catch((err) => console.error(err));
//   }
//   return null;
// };
// export const setCartUtil = (cart_id) => {
//   const token = Cookie.get("token");
//   return axios
//     .get(`${API_URL}/carts/${cart_id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//     .then((res) => {
//       // if res comes back not valid, token is not valid
//       // delete the token and log the user out on client
//       if (res.statusText !== "OK") {
//         return null;
//       }
//       const userCart = res.data;
//       //correcting price in cookie and elements
//       const arrayDishes = userCart.dishes;
//       let arrayElements = userCart.elements;

//       //CHECK ORDER ID OR NULL
//       const orderId = (userCart.order && userCart.order.id) || null;

//       const correctCart = correctingPrice(arrayDishes, arrayElements);
//       const getCart = getCartObject(correctCart, orderId);

//       Cookie.set("cart", correctCart.items);
//       return getCart;
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// };

// export const checkItemAndTotalCart = () => {
//   const cart = Cookie.get("cart");

//   // if items in cart, set items and total from cookie
//   if (typeof cart === "string" && cart !== "undefined") {
//     let sumTotal = 0;
//     JSON.parse(cart).forEach((item) => {
//       sumTotal += item.price * item.quantity;
//     });
//     return {
//       items: JSON.parse(cart),
//       total: sumTotal
//     };
//   }

//   return {
//     items: [],
//     total: 0,
//     orderId: null
//   };
// };
