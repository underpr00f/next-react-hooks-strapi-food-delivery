"use strict";
const axios = require("axios");

const API_URL = require("../../../utils/Constants").API_URL;
const getUrl = API_URL();

/**
 * Lifecycle callbacks for the `User` model.
 */
// console.log(`${getUrl}/carts`)
module.exports = {
  lifecycles: {
    // Before saving a value.
    // Fired before an `insert` or `update` query.
    // beforeSave: async (model, attrs, options) => {},

    // After saving a value.
    // Fired after an `insert` or `update` query.
    // afterSave: async (model, response, options) => {},

    // Before fetching a value.
    // Fired before a `fetch` operation.
    // beforeFetch: async (model, columns, options) => {},
    // After fetching a value.
    // Fired after a `fetch` operation.
    // afterFetch: async (model, response, options) => {},

    // Before fetching all values.
    // Fired before a `fetchAll` operation.
    // beforeFetchAll: async (model, columns, options) => {},

    // After fetching all values.
    // Fired after a `fetchAll` operation.
    // afterFetchAll: async (model, response, options) => {},

    // Before creating a value.
    // Fired before an `insert` query.
    beforeCreate: async (data, attrs, options) => {
      console.log("beforeCreate");
      console.log(getUrl);
      const cart = await axios.post(`${getUrl}/carts`);
      // model.set("cart_id", cart.data.id)
      data.cart_id = cart.data.id;
      // data.order_id = order.data.id;
      // strapi.query('model').action()
    },

    // After creating a value.
    // Fired after an `insert` query.
    // afterCreate: async (model, attrs, options) => {
    //   console.log("afterCreate");
    // },

    // Before updating a value.
    // Fired before an `update` query.
    // beforeUpdate: async (model, attrs, options) => {},

    // After updating a value.
    // Fired after an `update` query.
    // afterUpdate: async (model, attrs, options) => {},

    // Before destroying a value.
    // Fired before a `delete` query.
    // beforeDestroy: async (model, attrs, options) => {},

    // After destroying a value.
    // Fired after a `delete` query.
    // afterDestroy: async (model, attrs, options) => {}
  },
};
