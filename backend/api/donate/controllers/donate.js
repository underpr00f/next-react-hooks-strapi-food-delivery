"use strict";
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // create: async (ctx) => {
  //   const { message, user } = ctx.request.body;

  //   if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
  //     try {
  //       const { id, isAdmin = false } = await strapi.plugins[
  //         "users-permissions"
  //       ].services.jwt.getToken(ctx);
  //       if (id !== user) {
  //         return ctx.throw(403, "Forbidden");
  //       }
  //       const donate = await strapi.services.donate.create({ message, user });
  //       return sanitizeEntity(donate, { model: strapi.models.donate });
  //     } catch (err) {
  //       // It will be there!

  //       return ctx.throw(401, "Unauthorized");
  //     }
  //   }

  // const donate = await strapi.services.donate.create({ message, user });
  // return sanitizeEntity(donate, { model: strapi.models.donate });
  //GET CART AND CORRECT PRICE AND TITLE TO JSON ORDER
  // const checkCart = await strapi.services.cart.findOne({ id: cart_id });
  // const correctCart = correctingPrice(checkCart.dishes, checkCart.elements);
  // if (!correctCart.total) {
  //   return ctx.throw(400);
  // }
  // UPDATE ORDER
  // const order = await strapi.services.order.update(
  //   { id: order_id },
  //   {
  //     address,
  //     user,
  //     city,
  //     // state,
  //     payed,
  //     cart_id,
  //     last_dishes: correctCart.items,
  //     amount: correctCart.total,
  //   }
  // );

  // IF PAYED CREATE NEW ORDER AND CLEAR ITEMS CART WITH UPDATE ORDER_ID OF CART
  // if (payed) {
  //   const newOrder = await strapi.services.order.create({
  //     user: user,
  //     cart: cart_id,
  //     amount,
  //     address,
  //     city,
  //     // dishes,
  //   });
  //   console.log("newOrder", newOrder);
  //   await strapi.services.cart.update(
  //     { id: cart_id },
  //     { order: newOrder.id, elements: [], dishes: [] }
  //   );
  // }
  // },
  findLast: async (ctx) => {
    // const { message } = ctx.request.body;

    try {
      const { id, isAdmin = false } = await strapi.plugins[
        "users-permissions"
      ].services.jwt.getToken(ctx);
      const obj = await strapi
        .query("donate")
        .findOne({ user: id, confirmed: false });

      if (!obj) {
        return null;
      }
      // REMOVE USER FROM RESPONSE
      const blacklist = ["user"];

      const keys = Object.keys(obj);
      const filteredKeys = keys.filter((key) => !blacklist.includes(key));

      const filteredObj = filteredKeys.reduce((result, key) => {
        result[key] = obj[key];
        return result;
      }, {});
      return filteredObj;
    } catch (err) {
      // It will be there!

      return ctx.throw(401, "Unauthorized");
    }
  },
  createOrUpdate: async (ctx) => {
    const { message } = ctx.request.body;

    try {
      const { id, isAdmin = false } = await strapi.plugins[
        "users-permissions"
      ].services.jwt.getToken(ctx);

      const results = await strapi
        .query("donate")
        .findOne({ user: id, confirmed: false });
      let donate;
      if (!results) {
        console.log("CREATE");
        donate = await strapi.services.donate.create({ message, user: id });
      } else {
        console.log("UPDATE", results);
        donate = await strapi
          .query("donate")
          .update({ id: results.id }, ctx.request.body);
      }
      return sanitizeEntity(donate, { model: strapi.models.donate });
    } catch (err) {
      // It will be there!

      return ctx.throw(401, "Unauthorized");
    }
  },
};
