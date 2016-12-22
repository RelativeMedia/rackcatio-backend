/**
 * Created by mhdevita on 12/14/16.
 */
"use strict";

/**
 * Rack
 * @description :: Model for storing racks
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

    // associations
    items: {
      collection: 'Item',
      via: 'rack'
    },
    location: {
      model: 'Location'
    },
    comments: {
      collection: 'Comment',
      via: 'rack'
    },
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  }
}
