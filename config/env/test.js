"use strict";

/**
 * Test environment settings
 * @description :: This section overrides all other config values ONLY in test environment
 */

module.exports = {
  appUrl: 'http://localhost:1337/v1',
  log: {
    level: 'debug'
  },
  services: {
    cipher: {},
    hash: {
      crypto: {
        algorithm: 'aes-256-ctr',
        password: 'd6F3Efeq'
      }
    },
    image: {},
    mailer: {
      provider: {
        auth: {
          api_user: 'testuser', // SendGrid username
          api_key: 'testpassword' // SendGrid password
        }
      }
    }
  },
  models: {
    connection: 'memory',
    migrate: 'drop'
  }
};
