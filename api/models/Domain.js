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
    domain: {
      type: 'string',
      required: true
    },

    // associations
    subnet: {
      model: 'Subnet'
    },
    comments: {
      collection: 'Comment',
      via: 'domain'
    },
    items: {
      collection: 'Item',
      via: 'domains'
    },
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  }
}
