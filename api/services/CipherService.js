"use strict";

const cipher = require('sails-service-cipher');
const _      = require('lodash');
const config = _.merge(require('../../config/services/cipher'), require('../../config/local'));

module.exports = {
  jwt: cipher('jwt', config.services.cipher.jwt)
};
