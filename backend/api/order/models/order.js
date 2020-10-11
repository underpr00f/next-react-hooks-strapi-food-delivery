"use strict";
/**
 * Lifecycle callbacks for the `order` model.
 */

module.exports = {
  lifecycles: {
    beforeUpdate: async (params, data) => {
      console.log("beforeUpdate");

      // console.log("data", params, data);

      // const order = await strapi.query("order").findOne({ id: params });
      // console.log([order.last_dishes, data.current_dishes]);

      // console.log("data", params, data);
      // const cart = await axios.post(`${getUrl}/carts`);
      // const order = await axios.post(`${getUrl}/orders`);
      // data.cart_id = cart.data.id;
      // data.order_id = order.data.id;
    },
  },
};
