/**
 * Created by mhdevita on 12/17/2016.
 */
"use strict";

const should = require('chai').should();
const faker = require('faker');

let currentUser = {};
before((done) => {
  axios
    .post('/auth/login', {
      identity: 'admin',
      password: '12345'
    })
    .then((res) => {
      currentUser = res.data.data;
      axios.defaults.headers = {
        'Authorization': 'Bearer ' + currentUser.token
      }
      done();
    })
    .catch((err) => {
      sails.log.error(err);
      return done(err);
    });
});

describe('controllers:LocationController', () => {
  let currentLocation = {};
  beforeEach((done) => {
    Location
      .create({
        name: faker.name.firstName()
      })
      .then((location) => {
        currentLocation = location;
        done();
      })
      .catch((err) => {
        sails.log.error(err);
        return done(err);
      });
  });

  it('should list all locations', (done) => {
    axios
      .get('/location')
      .then((res) => {
        res.status.should.eql(200);
        res.data.should.include.keys('code', 'message', 'data');
        res.data.code.should.eql('OK');
        res.data.message.should.eql('Operation is successfully executed');
        res.data.data.should.be.an('array');
        done();
      })
      .catch((err) => {
        sails.log.error(err.response);
        return done(err);
      });
  });

  it('should list a single location', (done) => {
    axios
      .get('/location/' + currentLocation.id)
      .then((res) => {
        res.status.should.eql(200);
        res.data.should.include.keys('code', 'message', 'data');
        res.data.code.should.eql('OK');
        res.data.message.should.eql('Operation is successfully executed');
        res.data.data.should.be.an('object');
        done();
      })
      .catch((err) => {
        sails.log.error(err.response);
        return done(err);
      });
  });

  it('should create a new location', (done) => {
    const newLocation = {
      name: faker.name.firstName()
    };
    axios
      .post('/location', newLocation)
      .then((res) => {
        res.status.should.eql(201);
        res.data.should.include.keys('code', 'message', 'data');
        res.data.code.should.eql('CREATED');
        res.data.message.should.eql('The request has been fulfilled and resulted in a new resource being created');
        res.data.data.should.be.an('object');
        done();
      })
      .catch((err) => {
        sails.log.error(err.response);
        return done(err);
      });
  });

  it('should update an existing location', (done) => {
    const updatedLocation = {
      name: faker.name.firstName()
    };

    axios
      .put('/location/' + currentLocation.id, updatedLocation)
      .then((res) => {
        res.status.should.eql(200);
        res.data.should.include.keys('code', 'message', 'data');
        res.data.code.should.eql('OK');
        res.data.message.should.eql('Operation is successfully executed');
        res.data.data.should.be.an('object');
        res.data.data.name.should.eql(updatedLocation.name);
        done();
      })
      .catch((err) => {
        sails.log.error(err.response);
        return done(err);
      });
  });

  it('should delete a location', (done) => {
    axios
      .delete('/location/' + currentLocation.id)
      .then((res) => {
        res.status.should.eql(200);
        res.data.should.include.keys('code', 'message', 'data');
        res.data.code.should.eql('OK');
        res.data.message.should.eql('Operation is successfully executed');
        res.data.data.should.be.an('object');
        done();
      })
      .catch((err) => {
        sails.log.error(err.response);
        return done(err);
      });
  });
});
