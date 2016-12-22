"use strict";

/**
 * Development environment settings
 * @description :: This section overrides all other config values ONLY in development environment
 */

module.exports = {
  port: 1337,
  appUrl: 'http://localhost:1337/v1',
  log: {
    level: 'verbose'
  },
  models: {
    connection: 'disk'
  }
};
