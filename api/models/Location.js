/**
 * Created by mhdevita on 12/14/16.
 */
"use strict";

/**
 * Location
 * @description :: Model for storing locations
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
      via: 'location'
    },
    racks: {
      Collection: 'Rack',
      via: 'location'
    },
    subnets: {
      collection: 'Subnet',
      via: 'location'
    },
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  }
}
