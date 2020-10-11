"use strict";
const { sanitizeEntity } = require("strapi-utils");
const correctingPrice = require("../../../utils/cartUtils").correctingPrice;
// const getUrl = correctingPrice();
/**
 * Order.js controller
 *
 * @description: A set of functions called "actions" for managing `Order`.
 */

const stripe = require("stripe")("YOUR STRIPE SECRET KEY sk_");
module.exports = {
  /**
   * Create a/an order record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    // const { address, amount, dishes, token, city, state } = JSON.parse(
    //   ctx.request.body
    // );
    // const { address, amount, dishes, token, city, user_id } = ctx.request.body;
    // let payed = false;
    // const stripeAmount = Math.floor(amount * 100);
    // charge on stripe
    // const charge = await stripe.charges.create({
    //   // Transform cents to dollars.
    //   amount: stripeAmount,
    //   currency: "usd",
    //   description: `Order ${new Date()} by ${ctx.state.user._id}`,
    //   source: token,
    // });
    //CHECK PAYED
    // if (city === "Chicago") {
    //   payed = true;
    // }
    // console.log("HI", city, address, user_id);
    // Register the order in the database
    // const order = await strapi.services.order.create({
    //   user: user_id,
    //   amount,
    //   address,
    //   dishes,
    //   city,
    //   payed,
    // });
    // return order;
    // return order;
  },
  update: async (ctx) => {
    const {
      order_id,
      amount,
      user,
      address,
      city,
      state,
      payed,
      cart_id,
    } = ctx.request.body;

    //GET CART AND CORRECT PRICE AND TITLE TO JSON ORDER
    const checkCart = await strapi.services.cart.findOne({ id: cart_id });
    const correctCart = correctingPrice(checkCart.dishes, checkCart.elements);
    if (!correctCart.total) {
      return ctx.throw(400);
    }
    // UPDATE ORDER
    const order = await strapi.services.order.update(
      { id: order_id },
      {
        address,
        user,
        city,
        // state,
        payed,
        cart_id,
        last_dishes: correctCart.items,
        amount: correctCart.total,
      }
    );

    // IF PAYED CREATE NEW ORDER AND CLEAR ITEMS CART WITH UPDATE ORDER_ID OF CART
    if (payed) {
      const newOrder = await strapi.services.order.create({
        user: user,
        cart: cart_id,
        amount,
        address,
        city,
        // dishes,
      });
      console.log("newOrder", newOrder);
      await strapi.services.cart.update(
        { id: cart_id },
        { order: newOrder.id, elements: [], dishes: [] }
      );
    }
    return sanitizeEntity(order, { model: strapi.models.order });
  },
};

//FOR STRIPE
// module.exports = {
//   /**
//    * Create a/an order record.
//    *
//    * @return {Object}
//    */

//   create: async (ctx) => {
//     const { address, amount, dishes, token, city, state } = JSON.parse(
//       ctx.request.body
//     );
//     const stripeAmount = Math.floor(amount * 100);
//     // charge on stripe
//     const charge = await stripe.charges.create({
//       // Transform cents to dollars.
//       amount: stripeAmount,
//       currency: "usd",
//       description: `Order ${new Date()} by ${ctx.state.user._id}`,
//       source: token,
//     });

//     // Register the order in the database
//     const order = await strapi.services.order.create({
//       user: ctx.state.user.id,
//       charge_id: charge.id,
//       amount: stripeAmount,
//       address,
//       dishes,
//       city,
//       state,
//     });

//     return order;
//   },
// };
