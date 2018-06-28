'use strict';

/**
 * Province.js controller
 *
 * @description: A set of functions called "actions" for managing `Province`.
 */

module.exports = {

  /**
   * Retrieve province records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.province.fetchAll(ctx.query);
  },

  /**
   * Retrieve a province record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.province.fetch(ctx.params);
  },

  /**
   * Count province records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.province.count(ctx.query);
  },

  /**
   * Create a/an province record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.province.add(ctx.request.body);
  },

  /**
   * Update a/an province record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.province.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an province record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.province.remove(ctx.params);
  }
};
