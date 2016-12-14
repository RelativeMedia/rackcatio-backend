/**
 * Created by mhdevita on 12/14/16.
 */
/**
 * Comment
 * @description :: Model for storing comments
 */

module.exports = {
  schema: true,
  autoUpdatedBy: true,
  autoCreatedBy: true,
  attributes: {
    comment: {
      type: 'string',
      required: true
    },


    // associations
    item: {
      model: 'Item'
    },
    location: {
      model: 'Location'
    },
    rack: {
      model: 'Rack'
    },
    subnet: {
      model: 'Subnet'
    },
    productkey: {
      model: 'ProductKey'
    },
    domain: {
      model: 'Domain'
    },
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  }
}
