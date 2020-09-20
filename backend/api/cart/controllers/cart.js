'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

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

  // async create(ctx) {
  //   let entity;
  //   console.log(ctx.request)

    // entity = await strapi.services.cart.create(ctx.request.body);
    // try {
    //     entity = await strapi.services.cart.create({
    //         user: ctx.request.body.id,
    //         quantity: ctx.request.body.quantity
    //     });   
    // } catch (error) {
    //     console.log(error)
    //     // throw error;
    //     return ctx.throw(500, error);
    // }
    // entity = await strapi.query('cart').findOne({ user: ctx.request.body.id });
    // console.log(sanitizeEntity(entity, { model: strapi.models.cart }));
    // if (!entity) {
    //     console.log("preved")
    //     ctx.send({
    //         message: 'ok'
    //       });
    // }
    // console.log(entity);
    // return sanitizeEntity(entity, { model: strapi.models.cart });
    // return entity;
  // },
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