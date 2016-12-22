"use strict";

/**
 * Production environment settings
 * @description :: This section overrides all other config values ONLY in production environment
 */

module.exports = {
  port: 80,
  appUrl: 'http://localhost:1337/v1',
  log: {
    level: 'info'
  }
};
