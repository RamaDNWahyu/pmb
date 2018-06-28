'use strict';

/**
 * Regency.js controller
 *
 * @description: A set of functions called "actions" for managing `Regency`.
 */

module.exports = {

  /**
   * Retrieve regency records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.regency.fetchAll(ctx.query);
  },

  /**
   * Retrieve a regency record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.regency.fetch(ctx.params);
  },

  /**
   * Count regency records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.regency.count(ctx.query);
  },

  /**
   * Create a/an regency record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.regency.add(ctx.request.body);
  },

  /**
   * Update a/an regency record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.regency.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an regency record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.regency.remove(ctx.params);
  }
};
