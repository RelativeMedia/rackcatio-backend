"use strict";

const mailer = require('sails-service-mailer');
const _      = require('lodash');
const config = _.merge(require('../../config/services/mailer'), require('../../config/local'));

module.exports = mailer('SendGrid', config.services.mailer);
