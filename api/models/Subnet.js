/**
 * Created by mhdevita on 12/14/16.
 */
"use strict";

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
    start: {
      type: 'string',
      required: true,
      ip: true
    },
    end: {
      type: 'string',
      required: true,
      ip: true
    },
    mask: {
      type: 'string',
      required: true,
      ip: true
    },
    metadata: {
      type: 'json'
    },

    // associations
    comments: {
      collection: 'Comment',
      via: 'subnet'
    },
    items: {
      collection: 'Item',
      via: 'subnets'
    },
    domains: {
      collection: 'Domain',
      via: 'subnet'
    },
    location: {
      model: 'Location'
    },
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  }
}
