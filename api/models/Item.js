/**
 * Created by mhdevita on 12/14/16.
 */
"use strict";

/**
 * Item
 * @description :: Model for storing items
 */

module.exports = {
  schema: true,
  autoUpdatedBy: true,
  autoCreatedBy: true,
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    metadata: {
      type: 'json'
    },

    // associations
    comments: {
      collection: 'Comment',
      via: 'item'
    },
    subnets: {
      collection: 'Subnet',
      via: 'items'
    },
    domains: {
      collection: 'Domain',
      via: 'items'
    },
    rack: {
      model: 'Rack'
    },
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  }
}
