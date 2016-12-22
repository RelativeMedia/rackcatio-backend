const Sails = require('sails');
const Barrels = require('barrels');
const barrels = new Barrels();
const config = require('../config/env/test');

axios = require('axios');
axios.defaults.baseURL = config.appUrl;

let sails;
fixtures = barrels.data;

before((done) => {
  Sails.lift(config, (error, server) => {
    if (error) return done(error);

    barrels.populate(function (err) {
      if (err) {
        sails.log.error(err);
        return done(err);
      }
      sails = server;
      done();
    });

  });
});

after((done) => {
  sails.lower(done);
});
