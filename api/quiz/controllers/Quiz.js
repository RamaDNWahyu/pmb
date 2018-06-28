'use strict';

/**
 * Quiz.js controller
 *
 * @description: A set of functions called "actions" for managing `Quiz`.
 */

module.exports = {

  /**
   * Retrieve quiz records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.quiz.fetchAll(ctx.query);
  },

  /**
   * Retrieve a quiz record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.quiz.fetch(ctx.params);
  },

  /**
   * Count quiz records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.quiz.count(ctx.query);
  },

  /**
   * Create a/an quiz record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.quiz.add(ctx.request.body);
  },

  /**
   * Update a/an quiz record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.quiz.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an quiz record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.quiz.remove(ctx.params);
  }
};
