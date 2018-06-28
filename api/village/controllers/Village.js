'use strict';

/**
 * Village.js controller
 *
 * @description: A set of functions called "actions" for managing `Village`.
 */

module.exports = {

  /**
   * Retrieve village records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.village.fetchAll(ctx.query);
  },

  /**
   * Retrieve a village record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.village.fetch(ctx.params);
  },

  /**
   * Count village records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.village.count(ctx.query);
  },

  /**
   * Create a/an village record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.village.add(ctx.request.body);
  },

  /**
   * Update a/an village record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.village.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an village record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.village.remove(ctx.params);
  }
};
