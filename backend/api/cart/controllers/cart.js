"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");

// const sanitizeUser = user =>
//   sanitizeEntity(user, {
//     model: strapi.query('user', 'users-permissions').model,
//   });

module.exports = {
  /**
   * Create a record.
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

    ///////ПРОБЛЕМА С ЗАДВОЕНИЕМ ОРДЕРОВ
    //////НУЖНО ДОБАВИТЬ В ЛАЙФХУК КОРЗИНЫ ПО АНАЛОГИИ С ЛАЙФХУКОМ ЮЗЕРА
    console.log("CREATE!!!!!!!!!!!!");
    const order = await strapi.services.order.create();
    console.log("order", order._id);
    const cart = await strapi.services.cart.create({
      order: order._id,
    });

    return sanitizeEntity(cart, { model: strapi.models.cart });
  },
  async update(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.request.body;
    // console.log(user);
    // console.log(ctx.request.body, ctx.params);
    // let orderId = null;
    const entity = await strapi.services.cart.update({ id }, ctx.request.body);
    if (id && user) {
      const existOrder = await strapi.query("order").findOne({ cart: id });

      if (!existOrder) {
        console.log("!existOrder");
        await strapi.services.order.create({
          city: "MW",
          cart: id,
          user,
        });
        // orderId = createOrder.id;
        // return sanitizeEntity(createOrder, { model: strapi.models.order });
      } else {
        console.log("existed", existOrder);
        await strapi.services.order.update(
          { id: existOrder._id },
          {
            // city: "BMW",
          }
        );

        // orderId = existOrder.id;
        // const order = await strapi.services.order.createOrUpdate({ city: "NEW" });
        // return order;
        //   return sanitizeEntity(order, { model: strapi.models.order });
        // return sanitizeEntity(updateOrder, { model: strapi.models.order });
      }
    }
    // console.log("CART!", { ...ctx.request.body, order: orderId });
    // const entity = await strapi.services.cart.update(
    //   { id },
    //   { ...ctx.request.body, order: orderId }
    // );

    // console.log("entity", entity);
    // return entity;
    return sanitizeEntity(entity, { model: strapi.models.cart });
  },
  /**
   * Retrieve authenticated user.
   * @return {Object|Array}
   */
  // async find(ctx) {
  //   const user = ctx.state.user;
  //   console.log("user", ctx.state.user)
  //   if (!user) {
  //     return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
  //   }

  //   const customer = await strapi.query('cart').findOne({ user: user.id }, []);
  //   const withCustomer = { ...user, customer }

  //   const data = sanitizeUser(withCustomer);

  //   // ctx.send(data);
  //   ctx.send({message: "HEllo"});
  // }
};
/**
 * User.js controller
 *
 * @description: A set of functions called "actions" for managing `User`.
 */

// module.exports = {
//   /**
//    * Retrieve authenticated user.
//    * @return {Object|Array}
//    */
//   async me(ctx) {
//     const user = ctx.state.user;

//     if (!user) {
//       return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
//     }

//     const customer = await strapi.query('customer').findOne({ user: user.id }, []);
//     const withCustomer = { ...user, customer }

//     const data = sanitizeUser(withCustomer);
//     ctx.send(data);
//   }
// };
// const { address, amount, dishes, token, city, state } = JSON.parse(
//     ctx.request.body
//   );
//   const stripeAmount = Math.floor(amount * 100);
//   // charge on stripe
//   const charge = await stripe.charges.create({
//     // Transform cents to dollars.
//     amount: stripeAmount,
//     currency: "usd",
//     description: `Order ${new Date()} by ${ctx.state.user._id}`,
//     source: token,
//   });

//   // Register the order in the database
//   const order = await strapi.services.order.create({
//     user: ctx.state.user.id,
//     charge_id: charge.id,
//     amount: stripeAmount,
//     address,
//     dishes,
//     city,
//     state,
//   });

//   return order;
