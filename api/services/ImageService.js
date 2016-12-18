"use strict";

const image = require('sails-service-image');
const _      = require('lodash');
const config = _.merge(require('../../config/services/image'), require('../../config/local'));

module.exports = image('GM', config.services.image);
