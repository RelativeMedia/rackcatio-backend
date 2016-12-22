const assert = require('chai').assert;
const Sails = require('sails');
const Barrels = require('barrels');
const barrels = new Barrels();

const config = require('../config/env/test');

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
