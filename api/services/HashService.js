"use strict";

const hash   = require('sails-service-hash');
const crypto = require('crypto');
const _      = require('lodash');
const config = _.merge(require('../../config/services/hash'), require('../../config/local'));

module.exports = {
  bcrypt: hash('bcrypt', config.services.hash.bcrypt),
  crypto: crypto
};
