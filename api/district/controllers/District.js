'use strict';

/**
 * District.js controller
 *
 * @description: A set of functions called "actions" for managing `District`.
 */

module.exports = {

  /**
   * Retrieve district records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.district.fetchAll(ctx.query);
  },

  /**
   * Retrieve a district record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.district.fetch(ctx.params);
  },

  /**
   * Count district records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.district.count(ctx.query);
  },

  /**
   * Create a/an district record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.district.add(ctx.request.body);
  },

  /**
   * Update a/an district record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.district.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an district record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.district.remove(ctx.params);
  }
};
