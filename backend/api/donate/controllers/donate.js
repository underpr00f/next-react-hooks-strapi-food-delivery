"use strict"
const { sanitizeEntity } = require("strapi-utils")
const { hashChecker } = require("../../../utils/hashChecker")
const { filterObjWithBlacklist } = require("../../../utils/filterObjWithBlacklist")

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
      ].services.jwt.getToken(ctx)
      const obj = await strapi
        .query("donate")
        .findOne({ user: id, confirmed: false })

      if (!obj) {
        return {}
      }
      // REMOVE USER FROM RESPONSE
      const blacklist = ["user"]
      const filteredObj = filterObjWithBlacklist(blacklist, obj)

      return filteredObj
    } catch (err) {
      // It will be there!

      return ctx.throw(401, "Unauthorized")
    }
  },
  createOrUpdate: async (ctx) => {
    const { message } = ctx.request.body

    try {
      const { id, isAdmin = false } = await strapi.plugins[
        "users-permissions"
      ].services.jwt.getToken(ctx)

      const results = await strapi
        .query("donate")
        .findOne({ user: id, confirmed: false })
      let donate
      if (!results) {
        console.log("CREATE")

        //ORDER NUMBER BY COUNT OF ALL
        const currentOrder = await strapi.query('donate').count()

        donate = await strapi.services.donate.create({ message, user: id, order_id: currentOrder + 1 })
      } else {
        // const currentOrder = await strapi.query('donate').count()
        // console.log(currentOrder)
        console.log("UPDATE")
        //blacklist confirm
        const blacklist = ["confirmed", "order_id"]
        const filteredRequestBody = filterObjWithBlacklist(blacklist, ctx.request.body)

        donate = await strapi
          .query("donate")
          .update({ id: results.id }, filteredRequestBody)
      }
      return sanitizeEntity(donate, { model: strapi.models.donate })
    } catch (err) {
      // It will be there!

      return ctx.throw(401, "Unauthorized")
    }
  },
  updateToConfirm: async (ctx) => {
    const { message } = ctx.request.body
    const notification_secret = process.env.YANDEX_MONEY_SECRET || ""
    const payment_confirmed = hashChecker(ctx.request.body, notification_secret)
    if (payment_confirmed) {
      console.log("payment confirm")
    } else {
      return ctx.throw(401, "Wrong payment token")
    }
    // console.log("HI", ctx.request.body, hashChecker(ctx.request.body, notification_secret))
    // try {
    // const { id, isAdmin = false } = await strapi.plugins[
    //   "users-permissions"
    // ].services.jwt.getToken(ctx);

    // const results = await strapi
    //   .query("donate")
    //   .findOne({ user: id, confirmed: false });
    // let donate;
    // if (!results) {
    //   console.log("CREATE");
    //   donate = await strapi.services.donate.create({ message, user: id });
    // } else {
    //   console.log("UPDATE", results);
    //   donate = await strapi
    //     .query("donate")
    //     .update({ id: results.id }, ctx.request.body);
    // }
    // return sanitizeEntity(donate, { model: strapi.models.donate });
    //   return ctx.message("Hello");
    // } catch (err) {
    // It will be there!

    //   return ctx.throw(401, "Unauthorized");
    // }
    return (ctx.body = {
      status: "success",
    })
  },
}
