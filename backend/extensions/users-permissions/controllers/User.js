"use strict";

/**
 * User.js controller
 *
 * @description: A set of functions called "actions" for managing `User`.
 */
const { sanitizeEntity } = require("strapi-utils");

const sanitizeUser = (user) =>
  sanitizeEntity(user, {
    model: strapi.query("user", "users-permissions").model,
  });
module.exports = {
  async me(ctx) {
    // console.log("HELLLO!!!!");
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }
    const userQuery = await strapi.query("user", "users-permissions");
    const userWithMedia = await userQuery.findOne({ id: ctx.state.user.id });
    console.log("userWithMedia", userWithMedia);
    ctx.body = sanitizeUser(user);
  },
  async getUserOrders(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }
    const userQuery = await strapi.query("user", "users-permissions");
    const userWithMedia = await userQuery.findOne({ id: ctx.state.user.id });
    ctx.body = sanitizeUser(userWithMedia).orders || null;
  },
};
