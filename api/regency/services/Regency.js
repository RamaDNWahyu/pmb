'use strict';

/**
 * Regency.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all regencies.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    console.log(params)
    const filters = strapi.utils.models.convertParams('regency', params);
    // Select field to populate.
    const populate = Regency.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Regency
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an regency.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Regency.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Regency
      .findOne(_.pick(params, _.keys(Regency.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count regencies.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('regency', params);

    return Regency
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an regency.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Regency.associations.map(ast => ast.alias));
    const data = _.omit(values, Regency.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Regency.create(data);

    // Create relational data and return the entry.
    return Regency.updateRelations({ id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an regency.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Regency.associations.map(a => a.alias));
    const data = _.omit(values, Regency.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Regency.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Regency.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an regency.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Regency.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Regency
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Regency.associations.map(async association => {
        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  }
};
