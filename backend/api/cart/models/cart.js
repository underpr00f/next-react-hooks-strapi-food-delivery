"use strict";
const { sanitizeEntity } = require("strapi-utils");
// const API_URL = require("../../../utils/Constants").API_URL;
// const getUrl = API_URL();

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    afterUpdate: async (params, data, attr) => {
      //   console.log("data", attr, attr.user);
      //   const existOrder = await strapi
      //     .query("order")
      //     .findOne({ cart: params._id, user: attr.user });
      //   if (!existOrder) {
      //     const createOrder = await strapi.query("order").create({
      //       city: "MW",
      //       cart: params._id,
      //       user: attr.user,
      //     });
      //     sanitizeEntity(createOrder, { model: strapi.models.order });
      //   } else {
      //     console.log("existed", existOrder);
      //     const updateOrder = await strapi.services.order.update(
      //       { id: existOrder._id },
      //       {
      //         city: "BMW",
      //       }
      //     );
      //     sanitizeEntity(updateOrder, { model: strapi.models.order });
      //   }
      // const order = await strapi.services.order.createOrUpdate({ city: "NEW" });
      // return order;
      //   return sanitizeEntity(order, { model: strapi.models.order });
      // console.log([order.last_dishes, data.current_dishes]);
      //   console.log(order);
      // console.log("data", params, data);
      // const cart = await axios.post(`${getUrl}/carts`);
      //   const order = await axios.post(`${getUrl}/orders`);
      // data.cart_id = cart.data.id;
      // data.order_id = order.data.id;
    },
  },
};
